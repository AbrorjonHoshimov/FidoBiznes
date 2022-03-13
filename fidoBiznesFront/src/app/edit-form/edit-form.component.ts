import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Form_Document} from "../table/form_Document";
import {TranslateService} from "@ngx-translate/core";
import {dateParse} from "../service/dateParse";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MY_FORMATS} from "../form-document/form-document.component";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class EditFormComponent implements OnInit {
  attachmentId: any
  delivery_types: any;
  doc_senders: any;
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  todayIs = this.yyyy + '-' + this.mm + '-' + this.dd;
  todayInput = this.dd + '/' + this.mm + '/' + this.yyyy;
  id!: number
  formDoc: any
  formDocument = new Form_Document()
  showFileName=false
  filename=' '

  constructor(private tranlateService: TranslateService, private router: Router, private toastr: ToastrService, private http: HttpClient, private route: ActivatedRoute) {
    this.tranlateService.setDefaultLang(localStorage.getItem('lang') || 'en');
    this.tranlateService.use(localStorage.getItem('lang') || 'en')

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getOneDocument(this.id);
    this.getDeliveryTypeList()
    this.getDocSenderList()
  }

  getDeliveryTypeList(): void {
    this.http.get("http://18.233.7.60:80/api/del_type/list").subscribe(response => {
      this.delivery_types = response
    })
  }

  getDocSenderList(): void {
    this.http.get("http://18.233.7.60:80/api/doc_sender/list").subscribe(response => {
      this.doc_senders = response
    })
  }

  getOneDocument(id: number) {
    this.http.get("http://18.233.7.60:80/api/form/getOne/" + id).subscribe(respon => {
      this.formDoc = respon
    })
  }

  fileToServer(event: any) {
    if (event.target.files[0].size < 1048576) {

      let fileType = event.target.value
      this.showFileName = true
      this.filename = event.target.files[0].name + '  ' + ' :  Hajmi = ' + Math.round(event.target.files[0].size / 1024) + ' kb';

      if (fileType.endsWith(".PDF") || fileType.endsWith(".pdf") || fileType.endsWith(".doc") || fileType.endsWith(".docx")) {

        let file = event.target.files[0];


        let forFormData = new FormData()


        forFormData.append("file", file)

        if (event.target.size < 1048576) {
          this.http.post("http://18.233.7.60:80/attachment/uploadSytem", forFormData).subscribe(response => {
            this.attachmentId = response
            this.toastr.success("yuklandi")
            event.target.value = ''
          }, error => {
            this.toastr.error("Xatolik")
          })
        } else {
          this.toastr.warning("file max 1 MB")
        }
      } else {
        this.toastr.error("file turi noto'gri")
      }

    } else {
      this.toastr.error("File Max 1Mb ")
    }
  }


  edit(regNum: HTMLInputElement, theme: HTMLInputElement, sendNum: HTMLInputElement, sendDate: HTMLInputElement, expireDate: HTMLInputElement, deliveryId: HTMLSelectElement, description: HTMLTextAreaElement, senderId: HTMLSelectElement, control: HTMLInputElement, acces: HTMLInputElement) {
    let send = dateParse(sendDate.value)
    if (expireDate.value.length <= 0) {
      this.formDocument.expireDate = ' '
    } else {
      let expire = dateParse(expireDate.value)
      this.formDocument.expireDate = expire
    }
    this.formDocument.regNum = regNum.value
    this.formDocument.sendDocNum = sendNum.value
    this.formDocument.sendDate = send

    this.formDocument.theme = theme.value
    this.formDocument.access = acces.checked
    this.formDocument.cardControl = control.checked
    this.formDocument.someReference = description.value
    if (deliveryId.value.length===0){
      this.formDocument.deliveryTypeId = this.formDoc.deliveryTypeId
    }else {
      this.formDocument.deliveryTypeId = deliveryId.value
    }
    if (this.attachmentId==0){
      this.formDocument.attchmentId = this.formDoc.attchmentId
    }else{
      this.formDocument.attchmentId = this.attachmentId
    }
    if (senderId.value.length===0){
      this.formDocument.docSenderId = this.formDoc.docSenderId
    }else {
      this.formDocument.docSenderId=senderId.value
    }
    this.formDocument.regDate = this.formDoc.regDate


    this.http.put("http://18.233.7.60:80/api/form/" + this.id, this.formDocument).subscribe(response => {
      this.toastr.success("O'zgartirildi")
      this.router.navigate(['/table'])
    }, error => {
      this.toastr.error("xatolik")
    })

  }

  back() {
    this.router.navigate(['/table'])
    this.toastr.success("Orqa qaytish")
  }

}

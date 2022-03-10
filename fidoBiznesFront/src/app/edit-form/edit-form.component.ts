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
  todayInput = this.dd+'/'+this.mm + '/' + this.yyyy;
  id!: number
  formDoc: any
  formDocument = new Form_Document()


  constructor(private tranlateService: TranslateService, private router: Router, private toastr: ToastrService, private http: HttpClient, private route: ActivatedRoute) {
    this.tranlateService.setDefaultLang(localStorage.getItem('lang') || 'en');
    this.tranlateService.use(localStorage.getItem('lang') || 'en')

  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.getOneDocument(this.id);
    this.getDeliveryTypeList()
    this.getDocSenderList()
  }

  getDeliveryTypeList(): void {
    this.http.get("http://52.90.175.233:80/api/del_type/list").subscribe(response => {
      this.delivery_types = response
      console.log(this.delivery_types)
    })
  }

  getDocSenderList(): void {
    this.http.get("http://52.90.175.233:80/api/doc_sender/list").subscribe(response => {
      this.doc_senders = response
    })
  }

  getOneDocument(id: number) {
    this.http.get("http://52.90.175.233:80/api/form/getOne/" + id).subscribe(respon => {
      this.formDoc = respon
    })
  }


  edit(regNum: HTMLInputElement, theme: HTMLInputElement, sendNum: HTMLInputElement, sendDate: HTMLInputElement, expireDate: HTMLInputElement, deliveryId: HTMLSelectElement, description: HTMLTextAreaElement, senderId: HTMLSelectElement, control: HTMLInputElement, acces: HTMLInputElement) {
    let send = dateParse(sendDate.value)
    if (expireDate.value.length<=0){
      this.formDocument.expireDate = ' '
    }else {
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
    this.formDocument.deliveryTypeId = this.formDoc.deliveryTypeId
    this.formDocument.attchmentId = this.formDoc.attchmentId
    this.formDocument.docSenderId = this.formDoc.docSenderId
    this.formDocument.regDate = this.formDoc.regDate


    this.http.put("http://52.90.175.233:80/api/form/" + this.id, this.formDocument).subscribe(response => {
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

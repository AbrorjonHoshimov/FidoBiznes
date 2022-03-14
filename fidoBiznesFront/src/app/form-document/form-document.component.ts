import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Form_Document} from "../table/form_Document";
import {TranslateService} from "@ngx-translate/core";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {removeSpaces} from "../service/service";
import {dateParse} from "../service/dateParse";
import {DatePipe} from "@angular/common";

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-form-document',
  templateUrl: './form-document.component.html',
  styleUrls: ['./form-document.component.css'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class FormDocumentComponent implements OnInit {

  attachmentId: any
  delivery_types: any;
  doc_senders: any;
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  todayIs = this.yyyy + '-' + this.mm + '-' + this.dd;
  todayInput = this.dd+'/'+this.mm + '/' + this.yyyy;
  formDocument = new Form_Document
  filename = ''
  showFileName = false;
  form_docs:any
  existRegNum=0
  sendDateError=false;
  isRegNumberExist=false;
  saveId=0
  updateOrSave=false



  constructor(private datePipe:DatePipe,private router: Router, private toastr: ToastrService, private http: HttpClient, private tranlateService: TranslateService) {
    this.tranlateService.setDefaultLang(localStorage.getItem('lang') || 'en');
    this.tranlateService.use(localStorage.getItem('lang') || 'en')
  }

  myForm!: FormGroup

  ngOnInit(): void {
    this.getDocSenderList()
    this.getDeliveryTypeList()
    this.getAllFormDoc()
    this.myForm = new FormGroup({
      'regNumber': new FormControl(null, [Validators.required, removeSpaces]),
      'regDate': new FormControl(this.todayInput),
      'sendNumber': new FormControl(null, [Validators.required, removeSpaces]),
      'sendDate': new FormControl(null, Validators.required),
      'theme': new FormControl(null, [Validators.required, removeSpaces]),
      'delivery': new FormControl(null, [Validators.required, removeSpaces]),
      'sender': new FormControl(null, [Validators.required, removeSpaces]),
      'access':new FormControl(false),
      'expireDate':new FormControl(null),
      'descrip':new FormControl(null,[removeSpaces]),
      'control':new FormControl(false)


    })
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

  getAllFormDoc() {
    this.http.get("http://18.233.7.60:80/api/form/list").subscribe(response => {
      this.form_docs = response;

    })
  }
  goToTable() {
    this.router.navigate(['/table'])
    this.toastr.success("Orqaga qaytish")
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
          this.http.post("http://18.233.7.60:80/attachment/uploadSytem", forFormData).subscribe((response) => {
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

  add() {

    if (!this.updateOrSave){
    for (let i = 0; i < this.form_docs.length; i++) {
      if (this.form_docs[i].regNum===this.myForm.value.regNumber){
        this.existRegNum++
      }
    }

    if (this.existRegNum<=0){
        if (this.myForm.value.expireDate == null) {
          this.formDocument.expireDate = ''
        } else {
          let expire = this.datePipe.transform(this.myForm.value.expireDate,'yyyy-MM-dd')
          this.formDocument.expireDate = expire!
        }
        let send = this.datePipe.transform(this.myForm.value.sendDate,'yyyy-MM-dd')
        if (this.todayIs >= send!) {
          this.formDocument.access = this.myForm.value.access
          this.formDocument.cardControl = this.myForm.value.control
          this.formDocument.deliveryTypeId =this.myForm.value.delivery
          this.formDocument.docSenderId = this.myForm.value.sender
          this.formDocument.theme = this.myForm.value.theme
          this.formDocument.someReference = this.myForm.value.descrip
          this.formDocument.regNum = this.myForm.value.regNumber
          if (this.attachmentId != null) {
            this.formDocument.attchmentId = this.attachmentId
          } else {
            this.formDocument.attchmentId = 0
          }
          this.formDocument.sendDocNum = this.myForm.value.sendNumber
          this.formDocument.regDate = this.todayIs
          this.formDocument.sendDate = send!
          this.sendDateError=false;
          this.isRegNumberExist=false;
          this.http.post("http://18.233.7.60:80/api/form/add", this.formDocument).subscribe((response: any) => {
            this.toastr.success(response.message)
            this.saveId=response.saveId
            this.updateOrSave=true
          }, error => {
            this.toastr.error(error.message)
          })
        } else {
          this.sendDateError=true;
        }
    }else {
     this.isRegNumberExist=true
      this.existRegNum=0
    }
  }else {
      for (let i = 0; i < this.form_docs.length; i++) {
        if (this.form_docs[i].regNum===this.myForm.value.regNumber){
          this.existRegNum++
        }
      }

      if (this.existRegNum<=0){
        if (this.myForm.value.expireDate == null) {
          this.formDocument.expireDate = ''
        } else {
          let expire = this.datePipe.transform(this.myForm.value.expireDate,'yyyy-MM-dd')
          this.formDocument.expireDate = expire!
        }
        let send = this.datePipe.transform(this.myForm.value.sendDate,'yyyy-MM-dd')
        if (this.todayIs >= send!) {
          this.formDocument.access = this.myForm.value.access
          this.formDocument.cardControl = this.myForm.value.control
          this.formDocument.deliveryTypeId =this.myForm.value.delivery
          this.formDocument.docSenderId = this.myForm.value.sender
          this.formDocument.theme = this.myForm.value.theme
          this.formDocument.someReference = this.myForm.value.descrip
          this.formDocument.regNum = this.myForm.value.regNumber
          if (this.attachmentId != null) {
            this.formDocument.attchmentId = this.attachmentId
          } else {
            this.formDocument.attchmentId = null
          }
          this.formDocument.sendDocNum = this.myForm.value.sendNumber
          this.formDocument.regDate = this.todayIs
          this.formDocument.sendDate = send!
          this.sendDateError=false;
          this.isRegNumberExist=false;
          this.http.put("http://18.233.7.60:80/api/form/"+this.saveId, this.formDocument).subscribe((response: any) => {
            this.toastr.success(response.message)
            this.saveId=response.saveId
          }, error => {
            this.toastr.error(error.message)
          })
        } else {
          this.sendDateError=true;
        }
      }else {
        this.isRegNumberExist=true
        this.existRegNum=0
      }
    }
  }

}

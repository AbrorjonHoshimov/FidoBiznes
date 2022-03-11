import { Component, OnInit } from '@angular/core';
import {Filter} from "./Filter";
import {HttpClient} from "@angular/common/http";
import {filter} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {removeSpaces} from "../service/service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  delivery_types:any
  doc_senders:any
  filter=new Filter()
  myForm!: FormGroup
  constructor(private http:HttpClient,private dialogRef: MatDialogRef<FilterComponent>,private tranlateService:TranslateService) {
    this.tranlateService.setDefaultLang(localStorage.getItem('lang')||'en');
    this.tranlateService.use(localStorage.getItem('lang')||'en')
  }

  ngOnInit(): void {
    this.getDeliveryTypeList()
    this.getDocSenderList()
    this.myForm = new FormGroup({
      'regNumber': new FormControl(null, [removeSpaces]),
      'sendNumber': new FormControl(null, [ removeSpaces]),
      'theme': new FormControl(null, [removeSpaces]),
      'descrip': new FormControl(null, [ removeSpaces]),

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

  filterServer(regNum: HTMLInputElement, regDateStart: HTMLInputElement, regDateEnd: HTMLInputElement, sendNum: HTMLInputElement, sendDateStart: HTMLInputElement, sendDateEnd: HTMLInputElement, sender: HTMLSelectElement, theme: HTMLInputElement, description: HTMLTextAreaElement, delivery: HTMLSelectElement) {
    this.filter.regNum=regNum.value
    this.filter.regDateStart=regDateStart.value
    this.filter.regDateEnd=regDateEnd.value
    this.filter.sendDateStart=sendDateStart.value
    this.filter.sendDateEnd=sendDateEnd.value
    this.filter.sendDocNum=sendNum.value
    this.filter.correspondentId=sender.value
    this.filter.deliveryTypeId=delivery.value
    this.filter.someReference=description.value
    this.filter.theme=theme.value

    this.http.post("http://18.233.7.60:80/api/form/filter",this.filter).subscribe(res=>{
      this.dialogRef.close(res)
    })
  }

}

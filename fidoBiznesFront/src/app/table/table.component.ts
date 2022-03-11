import {AfterViewInit, Component, OnInit, ViewChild,HostListener } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from "@angular/common/http";
import {Form_Document} from "./form_Document";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {FilterComponent} from "../filter/filter.component";

interface USER {
  access: boolean
  expireDate: string
  regDate: string
  sendDate: string
  cardControl: boolean
  regNum: string
  sendDocNum: string
  someReference: string
  theme: string
  deliveryType: string
  senderName: string

}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  language: String = ''
  form_docs: any
  offset: number = 0;
  disabled = false
  showButton = true
  showSecondBut = true

  totalLength!:number
  page:number=1

  up = true
  down = false

  rDateUp = true
  rDateDown = false;

  sendNumUp = true
  sendNumDown = false

  sendDateUp = true
  sendDateDown = false

  deliveryUp = true
  deliveryDown = false;

  corresUp = true
  corresDown = false;

  themeUp = true
  themeDown = false;

  descripUp = true
  descripDown = false

  expireUp = true
  expireDown = false

  regNumUpColor: String = "white";
  regNumDownColor: String = "white";

  regDateUpColor: String = "white"
  regDateDownColor: String = "white"

  sendNumDownColor: String = "white";
  sendNumUpColor: String = "white";

  sendDateUpColor: String = "white";
  sendDateDownColor: String = "white";

  deliveryUpColor:String = "white";
  deliveryDownColor:String = "white";

  correspondentUpColor:String = "white";
  correspondentDownColor:String = "white";

  themeUpColor:String = "white";
  themeDownColor:String = "white";

  descriptionUpColor:String = "white";
  descriptionDownColor:String = "white";

  expireUpColor:String = "white";
  expireDownColor:String = "white";

  clicedRow:any;
  highlightRow!:number

  constructor(private http: HttpClient, private tranlateService: TranslateService, private toastr: ToastrService, private router: Router, private dialog: MatDialog) {
    this.tranlateService.setDefaultLang(localStorage.getItem('lang') || 'en');
    this.tranlateService.use(localStorage.getItem('lang') || 'en')
    this.clicedRow=function (index:number){
      this.highlightRow=index
    }
  }


  ngOnInit(): void {
    const lang = localStorage.getItem('lang') || 'en';
    this.getAllFormDoc()
    this.language = localStorage.getItem('lang') || 'uz';
  }

  getAllFormDoc() {
    this.http.get("http://18.233.7.60:80/api/form/list").subscribe((response:any) => {
      this.form_docs = response;
      this.totalLength=response.length
    })
  }


  delete(id: number) {
    let dialogRef = this.dialog.open(DialogComponent, {data: id})
    dialogRef.afterClosed().subscribe(result => {
      this.getAllFormDoc()

    })


  }

  changeLang(lang: HTMLSelectElement) {
    localStorage.setItem('lang', lang.value)
    window.location.reload()
  }

  toForm() {
    this.router.navigate(['/form'])
    this.toastr.success("Form Document")
  }

  edit(id: number) {
    this.router.navigate(['/form/' + id])
  }


  pageBack(offset: number) {
    if (offset <= 0) {
      this.offset + 5

    } else {
      this.offset = offset - 5

    }

  }

  change() {
    this.up = !this.up
    this.down = !this.down
    if (this.down == true) {
      this.regNumDownColor = "black"
      this.regNumUpColor = "white"
    } else {
      this.regNumDownColor = "white"
      this.regNumUpColor = "black"
    }

    this.http.get("http://18.233.7.60:80/api/form/orderByRegNum?sort=" + this.down).subscribe(res => {
      this.form_docs = res
    })
  }


  regDateSort() {
    this.rDateUp = !this.rDateUp
    this.rDateDown = !this.rDateDown
    if (this.rDateDown == true) {
      this.regDateDownColor = "black"
      this.regDateUpColor = "white"
    } else {
      this.regDateDownColor = "white"
      this.regDateUpColor = "black"
    }
    this.http.get("http://18.233.7.60:80/api/form/orderByRegDate?sort=" + this.rDateDown).subscribe(res => {
      this.form_docs = res
      console.log(res)
    })
  }


  sendDocSort() {
    this.sendNumUp = !this.sendNumUp
    this.sendNumDown = !this.sendNumDown

    if (this.sendNumDown==true){
      this.sendNumDownColor="black"
      this.sendNumUpColor='white'
    }else {
      this.sendNumDownColor="white"
      this.sendNumUpColor='black'
    }
    this.http.get("http://18.233.7.60:80/api/form/orderBySendNum?sort=" + this.sendNumDown).subscribe(res => {
      this.form_docs = res
    })
  }

  sendDateSort() {
    this.sendDateUp = !this.sendDateUp
    this.sendDateDown = !this.sendDateDown

    if ( this.sendDateDown==true){
      this.sendDateDownColor='black'
      this.sendDateUpColor='white'
    }else {
      this.sendDateDownColor='white'
      this.sendDateUpColor='black'
    }
    this.http.get("http://18.233.7.60:80/api/form/orderBySendDate?sort=" + this.sendDateDown).subscribe(res => {
      this.form_docs = res
    })
  }


  deliverySort() {
    this.deliveryUp = !this.deliveryUp
    this.deliveryDown = !this.deliveryDown
    if (this.deliveryDown==true){
      this.deliveryDownColor='black'
      this.deliveryUpColor='white'
    }else {
      this.deliveryDownColor='white'
      this.deliveryUpColor='black'
    }
    this.http.get("http://18.233.7.60:80/api/form/orderByDeliveryType?sort=" + this.deliveryDown).subscribe(res => {
      this.form_docs = res
    })
  }

  corresSort() {
    this.corresUp = !this.corresUp
    this.corresDown = !this.corresDown
    if (this.corresDown==true){
      this.correspondentDownColor='black'
      this.correspondentUpColor='white'
    }else {
      this.correspondentDownColor='white'
      this.correspondentUpColor='black'
    }
    this.http.get("http://18.233.7.60:80/api/form/orderBySender?sort=" + this.corresDown).subscribe(res => {
      this.form_docs = res
    })
  }

  themeSort() {
    this.themeUp = !this.themeUp
    this.themeDown = !this.themeDown
    if (this.themeDown==true){
      this.themeDownColor="black"
      this.themeUpColor="white"
    }else {
      this.themeDownColor="white"
      this.themeUpColor="black"
    }
    this.http.get("http://18.233.7.60:80/api/form/orderByTheme?sort=" + this.themeDown).subscribe(res => {
      this.form_docs = res
    })
  }

  descriptionSort() {
    this.descripUp = !this.descripUp
    this.descripDown = !this.descripDown
    if (this.descripDown==true){
      this.descriptionDownColor='black'
      this.descriptionUpColor='white'
    } else {
      this.descriptionDownColor='white'
      this.descriptionUpColor='black'
    }
    this.http.get("http://18.233.7.60:80/api/form/orderByDescription?sort=" + this.descripDown).subscribe(res => {
      this.form_docs = res
    })
  }

  expireSort() {
    this.expireUp = !this.expireUp
    this.expireDown = !this.expireDown
    if (this.expireDown==true){
      this.expireDownColor='black'
      this.expireUpColor='white'
    }else {
      this.expireDownColor='white'
      this.expireUpColor='black'
    }
    this.http.get("http://18.233.7.60:80/api/form/orderByExpireDate?sort=" + this.expireDown).subscribe(res => {
      this.form_docs = res
    })
  }

  openFilter() {
    let diologref = this.dialog.open(FilterComponent, {
      width: '60%',
      height: '100%',
      position: {
        top: '15px'
      }
    })
    diologref.afterClosed().subscribe(res => {
      this.form_docs = res
    })
  }

  refresh() {
    this.form_docs = this.getAllFormDoc();
    this.regNumUpColor = 'white';
    this.regNumDownColor = 'white';
    this.regDateUpColor = 'white'
    this.regDateDownColor = 'white'
    this.sendNumDownColor="white"
    this.sendNumUpColor='white'
    this.sendDateDownColor='white'
    this.sendDateUpColor='white'
    this.deliveryUpColor='white'
    this.deliveryDownColor='white'
    this.correspondentDownColor='white'
    this.correspondentUpColor='white'
    this.themeDownColor="white"
    this.themeUpColor="white"
    this.descriptionDownColor='white'
    this.descriptionUpColor='white'
    this.expireDownColor='white'
    this.expireUpColor='white'

  }

  exitInSystem() {
    if (confirm("Do you want to log out?")){
      this.router.navigate(['/'])
    }
  }

  arrowDownEvent(i:number) {
      let nextRow=this.highlightRow+1;
      this.clicedRow(nextRow)

  }

  arrowUpEvent(i:number) {
    let nextRow=this.highlightRow-1;
    this.clicedRow(nextRow)
  }

  reports(report: HTMLSelectElement) {
    console.log(report.value)
    if (report.value=='1'||report.value=='2'||report.value==='3'){
      this.router.navigate(['/report/'+report.value])
    }
  }
}



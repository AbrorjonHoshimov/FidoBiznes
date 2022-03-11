import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  id: number = 0;

  constructor(private tranlateService: TranslateService, @Inject(MAT_DIALOG_DATA) private data: number, private http: HttpClient,private toastr:ToastrService) {
    this.tranlateService.setDefaultLang(localStorage.getItem('lang') || 'en');
    this.tranlateService.use(localStorage.getItem('lang') || 'en')
  }

  ngOnInit(): void {
  }

  delete() {
    this.http.delete("http://18.233.7.60:80/api/form/" + this.data).subscribe(res => {
      this.toastr.success("Deleted")
    })

  }
}

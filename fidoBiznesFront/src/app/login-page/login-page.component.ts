import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {removeSpaces} from "../service/service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  myForm!: FormGroup
  language: String = ''
  list: any

  constructor(private http: HttpClient, private tranlateService: TranslateService, private router: Router, private toastr: ToastrService) {
    this.tranlateService.setDefaultLang(localStorage.getItem('lang') || 'en');
    this.tranlateService.use(localStorage.getItem('lang') || 'en')
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang') || 'en';
    const headers = new HttpHeaders({
      "Accept-Language": lang
    });
    this.http.get("http://52.90.175.233:80/api/form/list", {
      headers: headers
    }).subscribe(res => {
      this.list = res
    })
    this.language = localStorage.getItem('lang') || 'uz';
    this.myForm = new FormGroup({
      'user': new FormControl(null, [Validators.required, removeSpaces]),
      'pass': new FormControl(null, [Validators.required, removeSpaces]),

    })
  }


  changeLang(lang: HTMLSelectElement) {
    localStorage.setItem('lang', lang.value)
    window.location.reload()
  }

  login(userName: HTMLInputElement, password: HTMLInputElement) {
    let username = userName.value.trim();
    let pasword=password.value.trim()
    if (username == "Abror") {
      if (pasword == "aba777") {
        this.router.navigate(['/table'])
        this.toastr.success("Welcome")
      } else {
        this.toastr.error("Password error")
      }
    } else {
      this.toastr.error("Username error")
    }
  }
}

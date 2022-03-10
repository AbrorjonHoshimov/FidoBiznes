import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ToastrModule} from "ngx-toastr";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormDocumentComponent} from './form-document/form-document.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {EditFormComponent } from './edit-form/edit-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginPageComponent } from './login-page/login-page.component';
import {TranslateModule,TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule} from "@angular/material/dialog";
import { MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS, MatNativeDateModule} from "@angular/material/core";
import {MomentDateModule} from "@angular/material-moment-adapter";
import {MatInputModule} from "@angular/material/input";
import { FilterComponent } from './filter/filter.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path:'table',component:TableComponent},
  {path: 'form', component: FormDocumentComponent},
  {path: 'form/:id', component: EditFormComponent},
  {path: 'report/:id', component: ReportComponent},
];
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FormDocumentComponent,
    EditFormComponent,
    LoginPageComponent,
    DialogComponent,
    FilterComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MomentDateModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    HttpClient,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

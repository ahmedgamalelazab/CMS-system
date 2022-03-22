import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {WelcomeModule} from './../welcome/welcome.module';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { AdminModule } from '../sys-module/admin/admin.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AdminModule,
    WelcomeModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      // {path:'',redirectTo:'/home',pathMatch:'full'},
      {path:'**',redirectTo:'/home',pathMatch:'full'},
    ])
  ],
  exports:[
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class AppRoutesModule { }

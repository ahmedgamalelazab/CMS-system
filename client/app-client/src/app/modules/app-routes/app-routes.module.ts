import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {WelcomeModule} from './../welcome/welcome.module';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { RegisterComponent } from 'src/app/components/auth/register/register.component';
import { AdminModule } from '../sys-module/admin/admin.module';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdminModule,
    WelcomeModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'try',component:RegisterComponent},
      // {path:'',redirectTo:'/home',pathMatch:'full'},
      {path:'**',redirectTo:'/home',pathMatch:'full'},
    ])
  ],
  exports:[
    CommonModule,
    RouterModule
  ]
})
export class AppRoutesModule { }

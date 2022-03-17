import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'admin',component:AdminComponent},
    ],)
  ],
  exports:[CommonModule]
})
export class AdminModule { }

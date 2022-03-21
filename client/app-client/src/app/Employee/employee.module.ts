import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScriptService } from './services/script.store.service';
import { InvoiceModule } from './invoice/invoice.module';

const routes:Routes = [
  {
    path:'',component:EmployeeComponent,
    children:[
      {path:'',redirectTo:'/employee/home',pathMatch:'full'},
      {path:"home",component:HomeComponent},
      {path:"patient",loadChildren:()=>import("./patient/patient.module").then(m=>m.PatientModule)},
      {path:"invoice",loadChildren:()=>import("./invoice/invoice.module").then(m=>m.InvoiceModule)},
    ]
  }
]

@NgModule({
  declarations: [
    EmployeeComponent,
    HomeComponent
  ],
  imports: [
CommonModule,
    RouterModule.forChild(routes),
    InvoiceModule,
    NgxPaginationModule,
    
  ],
  exports:[
    EmployeeComponent,
    NgxPaginationModule
  ],
  // providers:[ScriptService]
})

export class EmployeeModule { }

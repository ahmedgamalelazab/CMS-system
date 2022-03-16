import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  // {path:"home",component:HomeComponent},
  {path:"",redirectTo:"/employee",pathMatch:"full"},
  {path:"employee",loadChildren:()=>import("./Employee/employee.module").then(m=>m.EmployeeModule)},
  // {path:"students",loadChildren:()=>import("./students/students.module").then(m=>m.StudentsModule)},
  //{path:"**",component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

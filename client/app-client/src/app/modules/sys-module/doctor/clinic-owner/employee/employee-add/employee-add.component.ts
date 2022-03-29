import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './../../../services/employee.service';
import { Employee } from './../../../_models/employee';

@Component({
  selector: 'pm-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  newEmployee: Employee = new Employee('', '', 0, 0, '', '', '', '', '');
  constructor(private empService: EmployeeService, public router: Router) { }

  ngOnInit(): void {
  }
  save() {
    this.empService.addNewEmployee(this.newEmployee).subscribe({
      next:res=>{
        alert("Employee has added successfully!");
        this.router.navigateByUrl('/clinic-owner/employee');
      },
      error:e=>console.warn(e),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../../../services/employee.service';
import { Employee } from './../../../_models/employee';
import { data } from 'jquery';

@Component({
  selector: 'pm-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employeesList: Employee[] = [];
  constructor(private empService: EmployeeService) { }
  employee: Employee = new Employee('', '', 0, 0, '', '', '', '', '');

  ngOnInit(): void {
    this.empService.getAllEmployees()
      .subscribe({
        next: response => {
          if (response.success) {
            this.employees = response.data;
            this.employeesList = response.data;
            console.log(response.data)
          } else {
            //handle this case
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('request sent and receied well')
      },

      )
  }

  searchEmployee(name: string) {
    if (name.length == 0) {
      this.employeesList = this.employees;
      return;
    }

    this.employeesList = [];
    this.employees.forEach(element => {
      if (element.name.toLowerCase().startsWith(name.toLowerCase()))
        this.employeesList.push(element);
    });
  }
  PassID(doctorId: number) {
    this.empService.employeeId = doctorId;
  }
  deleteEmployee(employeId: string) {
    if (confirm("Delete employee, Are you sure?")) {
      this.empService.removeEmployee(employeId).subscribe(() => {
        this.employeesList = this.employeesList.filter(el => el._id !== employeId);
      })
    }
  }
}






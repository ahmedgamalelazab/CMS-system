import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/_models/employee';

@Component({
  selector: 'pm-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  newEmployee: Employee = new Employee(0, '', 30, 1000);
  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
  }
  save() {
    this.empService.addEmployee(this.newEmployee);
  }
}

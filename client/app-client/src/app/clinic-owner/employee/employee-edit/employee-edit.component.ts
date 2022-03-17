import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/_models/employee';

@Component({
  selector: 'pm-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  // @Input() employee: Employee | null = null;
  employee: Employee = new Employee(0, '', 30, 1000);
  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
  }
  save() {
    this.empService.editEmployee(this.employee);
    //   if (this.employee != null) {
    //     this.empService.editEmployee(this.employee);
    //     this.employee = null;
    //   }

  }
}


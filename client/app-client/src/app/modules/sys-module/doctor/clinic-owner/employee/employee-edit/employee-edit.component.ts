import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from './../../../services/employee.service';
import { Employee } from './../../../_models/employee';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pm-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  // @Input() employee: Employee | null = null;
  // employee: Employee = new Employee(0, '', 30, 1000);
  employeeId: string | null = "";
  constructor(private empService: EmployeeService, public router: Router, public route: ActivatedRoute) { }
  editedEmployee: Employee = new Employee('', '', 0, 0, '', '', '', '', '');
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
  }
  save() {
    this.empService.editEmployee(this.employeeId, this.editedEmployee).subscribe(response => {
      this.router.navigate(['employee'])
    })
  }
}


import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/_models/employee';

@Component({
  selector: 'pm-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  @Output() empEvent = new EventEmitter<Employee>();
  @Output() actionEvent = new EventEmitter<string>();
  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.employees = this.empService.getAllEmployees();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.employees = this.empService.getAllEmployees();
  }

  addEmployee() {
    this.actionEvent.emit("add");
  }

  editEmployee(selectedEmp: Employee) {
    this.empEvent.emit(selectedEmp);
    this.actionEvent.emit("edit");
  }

  deleteEmployee(selectedEmp: Employee) {
    this.empService.removeEmployee(selectedEmp);
    this.employees = this.empService.getAllEmployees();
    this.empService.selectedEmployee = null;
    this.actionEvent.emit("");
  }

  searchEmployee(name: string) {
    if (name.length == 0) {
      this.employees = this.empService.getAllEmployees();
      return;
    }

    this.employees = [];
    this.empService.getAllEmployees().forEach(element => {
      if (element.Name.toLowerCase().startsWith(name.toLowerCase()))
        this.employees.push(element);
    });
  }

}






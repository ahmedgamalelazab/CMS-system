import { Injectable } from '@angular/core';
import { Employee } from './_models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public selectedEmployee: Employee | null = null;
  private employees: Employee[] = [
    new Employee(1, "Khaled Samy", 39, 2000),
    new Employee(2, "Eman Aly", 38, 6000),
    new Employee(3, "Ahmed Adel", 35, 3000),
    new Employee(4, "Ahmed Youssif", 35, 4000),
    new Employee(5, "Yasser Omar", 35, 4000),
    new Employee(6, "Samy Karam", 38, 4000),
    new Employee(7, "Omnia Ibrahim", 38, 3000)
  ]

  addEmployee(newEmployee: Employee) {
    this.employees.push(new Employee(newEmployee.Id, newEmployee.Name, newEmployee.Age, newEmployee.Salary));
  }

  getAllEmployees() {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | null {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].Id == id)
        return new Employee(this.employees[i].Id, this.employees[i].Name, this.employees[i].Age, this.employees[i].Salary);
    }
    return null;
  }

  editEmployee(editEmployee: Employee) {
    this.employees.forEach(employee => {
      if (employee.Id == editEmployee.Id) {
        employee.Name = editEmployee.Name;
        employee.Age = editEmployee.Age;
        employee.Salary = editEmployee.Salary;
      }
    });
  }

  removeEmployee(removeEmployee: Employee) {
    this.employees = this.employees.filter((employee) => {
      return employee.Id != removeEmployee.Id;
    })
  }

}

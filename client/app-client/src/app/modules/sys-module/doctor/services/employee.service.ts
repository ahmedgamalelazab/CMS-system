import { Injectable } from '@angular/core';
import { Employee } from '../_models/employee';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const requestOptions = {
  headers: new Headers(headerDict),
};
console.log(requestOptions);

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //public selectedEmployee: Employee | null = null;
  // private employees: Employee[] = [
  //   new Employee(1, "Khaled Samy", 39, 2000),
  //   new Employee(2, "Eman Aly", 38, 6000),
  //   new Employee(3, "Ahmed Adel", 35, 3000),
  //   new Employee(4, "Ahmed Youssif", 35, 4000),
  //   new Employee(5, "Yasser Omar", 35, 4000),
  //   new Employee(6, "Samy Karam", 38, 4000),
  //   new Employee(7, "Omnia Ibrahim", 38, 3000)
  // ]
  constructor(public http: HttpClient) {
  }
  baseUrl: string = "http://localhost:9999/api/v1/employee";

  employeeId: number = 1;

  //***********Get**********/
  getAllEmployees() {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.get<any>(this.baseUrl+"/clinic/MyClinicId", {
      headers: {
        'x-auth-token': userData.token
      }
    })
  }

  //***********Add********* */
  addNewEmployee(newEmp: Employee) {
    console.log(newEmp);
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.post<any>(this.baseUrl + '/add', {
      "name": newEmp.name,
      "age": newEmp.age,
      "salary": newEmp.salary,
      "userEmail": newEmp.email,
      "userPassword": newEmp.password,
    }, {
      headers: {
        'x-auth-token': userData.token
      }
    })

  }
  //*****************Edit************** */
  editEmployee(id: string | null, editEmp: Employee) {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.put<any>(this.baseUrl + "/update/" + id, {
      "name": editEmp.name,
      "age": editEmp.age,
      "salary": editEmp.salary
    }, {
      headers: {
        'x-auth-token': userData.token
      }
    })
  }

  //***********Delete by Id********* */ 
  removeEmployee(id: string) {
    console.log(id)
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.delete<any>(this.baseUrl + "/remove/" + id, {
      headers: {
        'x-auth-token': userData.token
      }
    })
  }
}

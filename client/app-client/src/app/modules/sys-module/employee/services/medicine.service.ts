import { Injectable } from '@angular/core';
import { Doctor } from '../_model/doctor';
import { Medicine } from '../_model/medicine';
// import {} from '../app/Medicine.json';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
// const headerDict = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Headers': 'Content-Type',
// }
// const requestOptions = {
//   headers: new Headers(headerDict),
// };
// console.log(requestOptions);


@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(public http: HttpClient) {
  }
  baseUrl: string = "http://localhost:9999/api/v1/medicine";
  // baseUrl: string = "assets/test_data/Medicine.json";

  medicineId: number = 1;
  //***********Get**********/
  getAllMedicinesObservable() {
    const userData = JSON.parse(window.sessionStorage.getItem('employee')?? window.sessionStorage.getItem('doctor')??'');
    return this.http.get<any>(this.baseUrl + 's',{
      headers:{
        'x-auth-token':userData.token
      }
    }).pipe(tap((response) => console.log(response)));
  }

  //***********Get Doctors**********/
  // getAllDoctors(): Doctor[] {
  //   return this.doctors;
  // }

  //***********Add********* */
  AddMedicine(med: Medicine) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee')??'');
    return this.http.post<any>(this.baseUrl + '/add', med,{
      headers:{
        'x-auth-token':userData.token
      }
    });
  }

  //***********Delete by Id********* */ 
  deleteMedicine(id: string) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee')??'');
    return this.http.delete<any>(this.baseUrl + "/remove/" + id,{
      headers:{
        'x-auth-token':userData.token
      }
    });
  }
  editMedicine(id: string | null, med: Medicine) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee')??'');
    return this.http.put<any>(this.baseUrl + "/update/" + id, med,{
      headers:{
        'x-auth-token':userData.token
      }
    });
  }
  //***********Get by Id********* */ 
  getMedicineByID(id: string) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee')??'');
    return this.http.get<any>(this.baseUrl + "/" + id,{
      headers:{
        'x-auth-token':userData.token
      }
    });
  }// end of get by Id

}

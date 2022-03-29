import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { Patient } from './../_model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  static allPatients:Patient[] = [];

  constructor(private http:HttpClient) { }

  private baseUrl:string="http://localhost:9999/api/v1/"

  /**
   * 
   * @param {string} clinicId 
   * @returns {Observable}
   */
  getAllClinicPatients(clinicId:string){  //62383abbb4e95f6ecff455a1 => clinicId
    const userData = JSON.parse(window.sessionStorage.getItem('employee')??'');
    console.warn(userData)
    return this.http.get<any>(`${this.baseUrl}patients/clinic/${clinicId}`,{
      headers:{
        'x-auth-token':userData.token
      }
    
    });
  }

  /**
   * 
   * @param {string} id 
   * @description: get patient data using his id
   * @returns {Observable}
   */
  getPatientById(id: string) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee')??'');
    return this.http.get<any>(`${this.baseUrl}patients/${id}`,{
      headers:{
        'x-auth-token':userData.token
      }
    });
  }
  /**
   * 
   * @param {Patient} newPatient 
   * @returns {Observable}
   */
  addPatient(newPatient:Patient){
    const userData = JSON.parse(window.sessionStorage.getItem('employee')??'');
    return this.http.post<any>(`${this.baseUrl}doctor/patients/add`,newPatient,{
      headers:{
        'x-auth-token':userData.token
      }
    });
  }

  /**
   * 
   * @param {Patient} ePatient 
   * @returns {Observable}
   */
  editPatient(ePatient:Patient){
    const userData = JSON.parse(window.sessionStorage.getItem('employee')??'');
    return this.http.put(`${this.baseUrl}doctor/patients/update/${ePatient._id}`,ePatient,{
      headers:{
        'x-auth-token':userData.token
      }
    });
  }

  /**
   * 
   * @param {Patient} rPatient
   * @returns {Observable}
   */
  removePatient(rPatient:Patient){
    const userData = JSON.parse(window.sessionStorage.getItem('employee')??'');
    return this.http.delete<any>(`${this.baseUrl}doctor/patients/remove/${rPatient._id}`,{
      headers:{
        'x-auth-token':userData.token
      }
    });
  }

}

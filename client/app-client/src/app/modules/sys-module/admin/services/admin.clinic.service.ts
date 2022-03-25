import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ClinicModel, IClinicDoctor, IClinicPayload } from '../network interfaces/Models';

@Injectable({
  providedIn: 'root',
})
export class AdminClinicService {
  constructor(private http: HttpClient) {}

  /**
   * @description : add clinic to the system
   * @allowed : ONLY ADMIN
   */
  adminAddClinic(clinicModel: ClinicModel) {
    //POST REQUEST
    //BECAUSE THIS API ROUTE IS PROTECTED SO I GOTTA SEND WITH IT MY TOKEN
    const adminData = JSON.parse(window.localStorage.getItem('admin') ?? '');
    console.log(adminData);
    //TODO handle ANY ERRORS
    return this.http
      .post<any>('http://localhost:9999/api/v1/clinics/add', clinicModel, {
        headers: {
          'x-auth-token': adminData.token,
        },
      })
      .pipe(tap((response) => console.log(response)));
  }

  /**
   * @description : get all the clinics stored on the system
   * @allowed : ONLY ADMIN
   */
  adminGelAllClinics() {
    //GET REQUEST
    const adminData = JSON.parse(window.localStorage.getItem('admin') ?? '');
    return this.http
      .get<any>('http://localhost:9999/api/v1/clinics', {
        headers: {
          'x-auth-token': adminData.token,
        },
      })
      .pipe(tap((response) => console.log(response)));
  }

  /**
   * @description : this will be used in clinic profile , delete specific clinic from the system
   * @allowed : ONLY ADMIN
   * @Yasser-Abd-El-Hady  && @HadeerEladawey1212 Pleas take care of logging process : if the doctor is owner and not connected to clinic , don't allow him to login
   */
  adminDeleteClinic(clinicId:string) {
    //DELETE REQUEST
    const adminData = JSON.parse(window.localStorage.getItem('admin') ?? '');
    return this.http.delete<any>(`http://localhost:9999/api/v1/clinics/delete/${clinicId}`,{
      headers:{
        "x-auth-token":adminData.token
      }
    }).pipe(tap((response)=>console.log(response)))
  }

  /**
   * @description : this will be used in clinic profile
   */
  adminUpdateClinic(payload:IClinicPayload,clinicId:string) {
    //PUT REQUEST
    const adminData = JSON.parse(window.localStorage.getItem('admin') ?? '');
    return this.http.put<any>(`http://localhost:9999/api/v1/clinics/update/${clinicId}`,payload,{
      headers:{
        "x-auth-token":adminData.token
      }
    }).pipe(tap((response)=>console.log(response)))
  }

  /**
   * @description : this is general will be used to replace the table
   * @allowed : ONLY ADMIN
   */
  adminGetClinicDoctors(clinicId: string) {
    //GET ALL CLINIC DOCS
    const adminData = JSON.parse(window.localStorage.getItem('admin') ?? '');
    return this.http.get<any>(
      `http://localhost:9999/api/v1/clinics/${clinicId}/doctors`,
      {
        headers: {
          'x-auth-token': adminData.token,
        },
      }
    ).pipe(tap((response)=>console.log(response)))
  }

  /**
   * @description : this is general will be used to replace the table
   */
  adminGetClinicEmployees(clinicId:string) {
    //GET ALL CLINIC DOCS
    const adminData = JSON.parse(window.localStorage.getItem('admin') ?? '');
    return this.http.get<any>(
      `http://localhost:9999/api/v1/employee/clinic/${clinicId}`,
      {
        headers: {
          'x-auth-token': adminData.token,
        },
      }
    ).pipe(tap((response)=>console.log(response)))

  }
  /**
   * @description : this is general will be used to replace the table
   */
  adminGetClinicProfile() {
    //GET ALL CLINIC DOCS
  }
}

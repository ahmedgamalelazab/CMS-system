import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { ClinicModel } from "../network interfaces/ClinicModel";


@Injectable({
  providedIn:'root'
})
export class AdminClinicService{


  constructor(private http:HttpClient){}


  adminAddClinic(clinicModel:ClinicModel){
    //POST REQUEST
    //BECAUSE THIS API ROUTE IS PROTECTED SO I GOTTA SEND WITH IT MY TOKEN
    const adminData = JSON.parse(window.localStorage.getItem('admin')??"");
    //TODO handle ANY ERRORS
    return this.http.post('http://localhost:9999/api/v1/clinics/add',clinicModel,{
      headers:{
        "x-auth-token":adminData.token
      }
    }).pipe(
      tap(response=>console.log(response))
      )
    }

    adminGelAllClinics(){
      //GET REQUEST
      const adminData = JSON.parse(window.localStorage.getItem('admin')??"");
      return this.http.get<any>('http://localhost:9999/api/v1/clinics',{
        headers:{
          "x-auth-token":adminData.token
        }
    }).pipe(tap(response=>console.log(response)))

  }

  adminDeleteClinic(){
    //DELETE REQUEST
  }

  adminUpdateClinic(){
    //PUT REQUEST
  }

  adminGetClinicDoctors(){
    //GET ALL CLINIC DOCS
  }




}

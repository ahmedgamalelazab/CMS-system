import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClinicModel } from "../network interfaces/ClinicModel";


@Injectable({
  providedIn:'root'
})
export class AdminClinicService{


  constructor(private http:HttpClient){}


  adminAddClinic(clinicModel:ClinicModel){
    //POST REQUEST
    //TODO update this request to take third param as header to send the token with it
    this.http.post('http://localhost:9999/api/v1/clinics/add',clinicModel)
  }

  adminGelAllClinics(){
    //GET REQUEST
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

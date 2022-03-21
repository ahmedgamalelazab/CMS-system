import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prescription } from '../_model/Prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(public http:HttpClient) { }
  //list of Prescription
  private baseUrl="";
  getAllPrescription(){
    return this.http.get<Prescription[]>(this.baseUrl);
  }
  //get Prescription by id
  getPrescriptionByID(id: number) {
    return this.http.get<Prescription>(this.baseUrl+"/"+id);
  }
  //add to list of Prescription
  addPrescription(prescription:Prescription){
   return this.http.post<Prescription>(this.baseUrl,prescription);
  }
  //edit  Prescription in list
  editPrescription(prescription:Prescription) {
    return this.http.put<Prescription>(this.baseUrl,prescription);
  }
  //delete Prescription from list
  deletePrescription(id:number){
    return this.http.delete(this.baseUrl+"/"+id);
  }
  
}

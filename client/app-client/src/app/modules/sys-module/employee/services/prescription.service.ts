import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs';
import { Prescription } from './../_model/prescription';

@Injectable({
    providedIn: 'root'
})
export class PrescriptionService {

    static allPrescriptions: Prescription[] = [];

    constructor(private http: HttpClient) {
    }

    private baseUrl: string = "http://localhost:9999/api/v1/"

    getAllPrescriptions() {
        return this.http.get<Prescription[]>(this.baseUrl).pipe(
            tap((obs) => console.log(obs)),
        );
    }

    async getPatientById(id: number) {
        return PrescriptionService.allPrescriptions[id - 1];
    }

    /**
   * 
   * @returns {Observable}
   */
    getPendingPrescriptions() {  //62383abbb4e95f6ecff455a1 => clinicId
        const userData = JSON.parse(window.sessionStorage.getItem('employee') ?? '');
        console.warn(userData)
        return this.http.get<any>(`${this.baseUrl}prescriptions/clinic/pending`, {
            headers: {
                'x-auth-token': userData.token
            }

        });
    }

        //edit  Prescription in list
    editPrescription(prescription:Prescription) {
        const userData = JSON.parse(window.sessionStorage.getItem('employee') ?? '');
        return this.http.put<any>(this.baseUrl+"prescription/update/"+prescription._id,prescription,{
            headers:{
                'x-auth-token': userData.token
            }
        });
    }

    // getAllPatients(){
    //   return this.http.get<Patient[]>(this.baseUrl);
    // }

    // getPatientById(id: number) {
    //   return this.http.get<Patient|null>(this.baseUrl+"/"+id);
    // }

    // addPatient(newPatient:Patient){
    //   return this.http.post<Patient>(this.baseUrl,newPatient);
    // }

    // editPatient(ePatient:Patient){
    //   return this.http.put(this.baseUrl,ePatient);
    // }

    // removePatient(rPatient:Patient){
    //   return this.http.delete(this.baseUrl+"/"+rPatient._id);
    // }
}

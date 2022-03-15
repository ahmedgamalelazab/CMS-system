import { Injectable } from '@angular/core';
import { Prescription } from './_model/Prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private Prescriptions: Prescription[] = [
    new Prescription(1,"Ahmed","Dr.Omar","Trust Care Center",3),
    new Prescription(2,"Ali","Dr.Mohammed","Journey to Dianosis",2),
    new Prescription(3,"Noha","Dr.Hend","HealthCare",4),
    new Prescription(4,"Mona","Dr.Hadeer","Alhoda",4),
    new Prescription(5,"Halaa","Dr.Yehya","Almokhtabar",2)
  ];

  constructor() { }
  //list of Prescription
  getAllPrescription():Prescription[]{
    return this.Prescriptions;
  }
  //get Prescription by id
  getPrescriptionByID(id: number): Prescription {
    for (let i = 0; i < this.Prescriptions.length; i++) {
      if (this.Prescriptions[i].pid == id) {
        return new Prescription(this.Prescriptions[i].pid, this.Prescriptions[i].patientName,this.Prescriptions[i].doctortName,this.Prescriptions[i].clinicName,this.Prescriptions[i].dose);
      }
    }
    return new Prescription(0,"","","",0);
  }
  //add to list of Prescription
  addPrescription(p:Prescription){
    this.Prescriptions.push(new Prescription(p.pid,p.patientName,p.doctortName,p.clinicName,p.dose));
  }
  //edit  Prescription in list
  editPrescription(p:Prescription) {
    for (let i = 0; i < this.Prescriptions.length; i++) {
      if (this.Prescriptions[i].pid == p.pid) {
        this.Prescriptions[i].patientName = p.patientName;
        this.Prescriptions[i].doctortName = p.doctortName;
        this.Prescriptions[i].clinicName=p.clinicName;
        this.Prescriptions[i].dose=p.dose;
        return;
      }
    }
  }
  //delete patient from list
  delete(id:number){
    for(let i=0;i<this.Prescriptions.length;i++){
        if(this.Prescriptions[i].pid==id){
          this.Prescriptions.splice(i,1);
        }
    }
    return;
  }
  
}

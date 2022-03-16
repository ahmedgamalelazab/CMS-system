import { Injectable } from '@angular/core';
import { Prescription } from './_model/Prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private Prescriptions: Prescription[] = [
    new Prescription(1,"Mohammed","Dr.Omar","Trust Care Center",["Esbriet","Torseretic","Concor5","pirfict"],new Date(2020,3,20)),
    new Prescription(2,"Ali","Dr.Mohammed","Journey to Dianosis",["Esbriet","Torseretic","Concor5","pirfict"],new Date(2020,3,20)),
    new Prescription(3,"Noha","Dr.Hend","HealthCare",["Esbriet","Torseretic","Concor5","pirfict"],new Date(2020,4,20)),
    new Prescription(4,"Mona","Dr.Hadeer","Alhoda",["Esbriet","Torseretic","Concor5","pirfict"],new Date (2020,8,23)),
    new Prescription(5,"Halaa","Dr.Yehya","Almokhtabar",["Esbriet","Torseretic","Concor5","pirfict"],new Date (2020,4,26))
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
        return new Prescription(this.Prescriptions[i].pid, this.Prescriptions[i].patientName,this.Prescriptions[i].doctortName,this.Prescriptions[i].clinicName,this.Prescriptions[i].listmedicine,this.Prescriptions[i].date);
      }
    }
    return new Prescription(0,"","","",["","","",""],new Date());
  }
  //add to list of Prescription
  addPrescription(p:Prescription){
    this.Prescriptions.push(new Prescription(p.pid,p.patientName,p.doctortName,p.clinicName,p.listmedicine,p.date));
  }
  //edit  Prescription in list
  editPrescription(p:Prescription) {
    for (let i = 0; i < this.Prescriptions.length; i++) {
      if (this.Prescriptions[i].pid == p.pid) {
        this.Prescriptions[i].patientName = p.patientName;
        this.Prescriptions[i].doctortName = p.doctortName;
        this.Prescriptions[i].clinicName=p.clinicName;
        this.Prescriptions[i].date=p.date;
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

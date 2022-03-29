import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { PrescriptionService } from './../../../services/prescription.service';
import { Prescription } from './../../../_models/Prescription';
import { MedicineService } from './../../../../employee/services/medicine.service';
import { DoctorService } from './../../../services/doctor.service';

@Component({
  selector: 'pm-prescription-add',
  templateUrl: './prescription-add.component.html',
  styleUrls: ['./prescription-add.component.css']
})
export class PrescriptionAddComponent implements OnInit {
  //after merge take aray of medicine to display to be dynamic list of medicine not static
  //medicines:medicine=[];
  selectedPatient:any = null;
  selectedMed:any = null;
  medicines: any = [];
  patients:any = [];
  newPrescription: Prescription = new Prescription("", "", "", "", [""], new Date(), false, 0, "cash", true, new Date(), new Date());
  constructor(private PrescriptionSer: PrescriptionService, private router: Router,private medServ:MedicineService, private docServ:DoctorService) { }
  save() {

    if (this.checkData()) {
      let totalPrice = 0;
      for (let index = 0; index < this.selectedMed.length; index++) {
        const element = this.selectedMed[index];
        totalPrice+=element.price;
      }
      this.newPrescription.patient = this.selectedPatient._id;
      this.newPrescription.medicine = this.selectedMed;
      this.newPrescription.totalPrice = totalPrice;
      this.PrescriptionSer.addPrescription(this.newPrescription).subscribe({
        next:res=>{alert("Prescription added Successfully!");
          this.router.navigateByUrl("/clinic-owner/prescription");},
        error:e=>console.warn(e)
      })//.subscribe(() => this.router.navigate(['prescription']));
      
    }
  }
  ngOnInit(): void {
    this.medServ.getAllMedicinesObservable().subscribe({
      next:(res)=>this.medicines = res.data,
      error:e=>console.warn(e)
    })

    this.docServ.getAllDoctorPatients().subscribe({
      next:(res)=>{
        console.warn(res);
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          if(i>0){
            if(this.patients[this.patients.length-1]._id !== element.patient._id)
              this.patients.push(element.patient)
          }else{
            this.patients.push(element.patient)
          }
        }
      },
      error:e=>console.warn(e)
    })
  }

  checkData():boolean{
    if(!this.selectedMed || !this.selectedPatient)
      return false;
    return true;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from './../../../../employee/services/medicine.service';
import { PrescriptionService } from './../../../services/prescription.service';
import { Prescription } from './../../../_models/Prescription';

@Component({
  selector: 'pm-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit {
  PrescId: string | null = "";
  medicines: any = [];
  selectedMed: any = null;
  editedPrescription: Prescription = new Prescription("", "", "", "", [""], new Date(), true, 0, "", false, new Date(), new Date());
  constructor(private activeR: ActivatedRoute, private PrescriptionSer: PrescriptionService, private router: Router, private medServ: MedicineService) { }
  ngOnInit(): void {
    this.medServ.getAllMedicinesObservable().subscribe({
      next: (res) => this.medicines = res.data,
      error: e => console.warn(e)
    })
    this.PrescId = this.activeR.snapshot.paramMap.get('id');
    console.log(this.PrescId);

    if (this.PrescId != null) {
      this.PrescriptionSer.getPrescriptionByID(this.PrescId).subscribe({
        next: respose => {
          if (respose.success) {
            this.editedPrescription = respose.data;
            // this.medicines=respose.data.medicine;
            // console.log(this.medicines);
          }
        }
      });
    }
  }

  SaveEditedPrescription() {
    let totalPrice = 0;
    for (let index = 0; index < this.selectedMed.length; index++) {
      const element = this.selectedMed[index];
      totalPrice += element.price;
    }
    this.editedPrescription.medicine = this.selectedMed;
    this.editedPrescription.totalPrice = totalPrice;
    this.PrescriptionSer.editPrescription(this.editedPrescription, this.PrescId).subscribe({
      next: res => {
        alert("Prescription edited Successfully!");
        this.router.navigateByUrl("/clinic-owner/prescription");
      },
      error: e => console.warn(e)
    })

  }
}

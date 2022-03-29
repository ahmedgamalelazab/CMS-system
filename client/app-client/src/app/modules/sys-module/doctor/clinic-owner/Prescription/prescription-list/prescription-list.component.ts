import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from './../../../services/prescription.service';
import { Prescription } from './../../../_models/Prescription';

@Component({
  selector: 'pm-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  page: number = 1;
  Prescriptions: Prescription[] = [];
  PrescriptionList: Prescription[] = [];
  constructor(private PrescriptionSer: PrescriptionService) { }
  ngOnInit(): void {

    this.PrescriptionSer.getAllClinicPrescription()
      .subscribe({
        next: response => {
          {
            console.log(response);
            if (response.success) {
              this.Prescriptions = response.data;
              this.PrescriptionList = response.data;
            }
          }
        },
        error: (e) => { console.log(e) },
        complete: () => console.log('request sent and receied well')
      });
  }

  deletePrescription(id: string) {
    if (confirm("Are you sure you want delete this record?")) {
      //this.PrescriptionSer.deletePrescription(id);
      this.PrescriptionSer.deletePrescription(id).subscribe(() => {
        this.PrescriptionList = this.PrescriptionList.filter(e => e._id !== id);
      })
    }
  }
  //search by patient firstName+lastName
  searchprescription(pname: string) {
    if (pname.length == 0) {
      this.PrescriptionList = this.Prescriptions;
      return;
    }
    this.PrescriptionList = [];
    this.Prescriptions.forEach(element => {
      console.log(element)
      if ((element.patient.firstName.toLowerCase() + " " + element.patient.lastName.toLowerCase()).startsWith(pname.toLowerCase()))
        this.PrescriptionList.push(element);
    });

  }

}

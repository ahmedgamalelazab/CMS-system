import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/prescription.service';
import { Prescription } from 'src/app/_model/Prescription';

@Component({
  selector: 'pm-prescription-add',
  templateUrl: './prescription-add.component.html',
  styleUrls: ['./prescription-add.component.css']
})
export class PrescriptionAddComponent implements OnInit {

  newPrescription: Prescription = new Prescription(0,"","","",0);
  constructor(private PrescriptionSer: PrescriptionService) { }
  save() {
    this.PrescriptionSer.addPrescription(this.newPrescription);
  }
  ngOnInit(): void {
  }

}

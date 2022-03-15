import { Component, Input, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/prescription.service';
import { Prescription } from 'src/app/_model/Prescription';

@Component({
  selector: 'pm-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit {

  constructor(private PrescriptionSer: PrescriptionService) { }
  @Input() editedPrescription: Prescription = new Prescription(0,"","","",0);

  ngOnInit(): void {
  }
  SaveEditedPrescription() {
    this.PrescriptionSer.editPrescription(this.editedPrescription);
  }

}

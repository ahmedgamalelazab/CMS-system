import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { Prescription } from 'src/app/_model/Prescription';

@Component({
  selector: 'pm-prescription-add',
  templateUrl: './prescription-add.component.html',
  styleUrls: ['./prescription-add.component.css']
})
export class PrescriptionAddComponent implements OnInit {

  newPrescription: Prescription |null=null;
  constructor( private PrescriptionSer: PrescriptionService, private router: Router) { }
  save() {
    if (this.newPrescription != null) {
      this.PrescriptionSer.addPrescription(this.newPrescription);
      alert("Prescription added Successfully!");
      this.router.navigateByUrl("/prescription");
    }
  }
  ngOnInit(): void {
  }

}

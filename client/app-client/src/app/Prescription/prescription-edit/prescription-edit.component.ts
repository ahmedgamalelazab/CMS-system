import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionService } from 'src/app/prescription.service';
import { Prescription } from 'src/app/_model/Prescription';

@Component({
  selector: 'pm-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit {
 // @Input() editedPrescription: Prescription = new Prescription(0,"","","",0);
 editedPrescription: Prescription  = new Prescription(0,"","","",["","","",""],new Date());
 
  constructor(private activeR:ActivatedRoute,private PrescriptionSer: PrescriptionService,private router:Router) { }
  ngOnInit(): void {
    this.activeR.params.subscribe(a=>{
      // this.PrescriptionSer.getPrescriptionByID(a["pid"]).subscribe(presc=>this.editedPrescription=presc);
      this.editedPrescription= this.PrescriptionSer.getPrescriptionByID(a["pid"]);
    })
    //this.editedPrescription= this.PrescriptionSer.getPrescriptionByID(this.editedPrescription.pid);
  }
  SaveEditedPrescription() {
    if(this.editedPrescription!=null)
    this.PrescriptionSer.editPrescription(this.editedPrescription);
    alert("Prescription edited Successfully!");
    this.router.navigateByUrl("/prescription");
  }

}

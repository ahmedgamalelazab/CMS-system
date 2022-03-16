import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/prescription.service';
import { Prescription } from 'src/app/_model/Prescription';

@Component({
  selector: 'pm-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {

  Prescriptions: Prescription[] = [];
  prescription: Prescription = new Prescription(0,"","","",["","","",""],new Date());
  PrescriptionList:Prescription[] = this.PrescriptionSer.getAllPrescription();
  constructor(private PrescriptionSer:PrescriptionService) { }
 
  PrescriptionDetails(pid: number) {
    this.prescription= this.PrescriptionSer.getPrescriptionByID(pid);
  }
  deletePrescription(id:number){
    if(confirm("Are you sure you want delete this record?")){
      this.PrescriptionSer.delete(id);
    }
   

  }
  
  searchprescription(pname:string){
    if(pname.length == 0){
      this.PrescriptionList = this.Prescriptions;
      return;
    }
    this.PrescriptionList = [];
    this.Prescriptions.forEach(element => {
      if(element.patientName.toLowerCase().startsWith(pname.toLowerCase()))
        this.PrescriptionList.push(element);
    });

  }

  ngOnInit(): void {
   
    this.Prescriptions=this.PrescriptionSer.getAllPrescription();
  
  
  }
}

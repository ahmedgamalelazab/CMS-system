import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { Prescription } from 'src/app/_model/Prescription';

@Component({
  selector: 'pm-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {

  Prescriptions: Prescription[] = [];
  PrescriptionList:Prescription[] = [];
  constructor(private PrescriptionSer:PrescriptionService) { }
 
  deletePrescription(id:number){
    if(confirm("Are you sure you want delete this record?")){
      this.PrescriptionSer.deletePrescription(id);
    }
  }
  
  searchprescription(pname:string){
    //will be updated after merging
    //-----------------------------------
    // if(pname.length == 0){
    //   this.PrescriptionList = this.Prescriptions;
    //   return;
    // }
    // this.PrescriptionList = [];
    // this.Prescriptions.forEach(element => {
    //   if(element.patient.toLowerCase().startsWith(pname.toLowerCase()))
    //     this.PrescriptionList.push(element);
    // });

  }

  ngOnInit(): void {
   
   this.PrescriptionSer.getAllPrescription().subscribe({
     next:(p)=>{this.Prescriptions=p;this.PrescriptionList=p},
     error:(e)=>{console.error(e)}
   });
  
  
  }
}

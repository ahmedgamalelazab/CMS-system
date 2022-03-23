import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScriptService } from '../../services/script.store.service';
import { ClinicClientInTable, ClinicModel } from '../network interfaces/ClinicModel';
import { AdminClinicService } from '../services/admin.clinic.service';

@Component({
  selector: 'pm-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css'],
  // providers:[ScriptService]
})
export class ClinicComponent implements OnInit {

  constructor(private script:ScriptService,private adminClinicService:AdminClinicService) { }

  clientClinics:ClinicClientInTable[] = [];

  ngOnInit(): void {

    this.adminClinicService.adminGelAllClinics().subscribe({
      next:(response)=>{
        response.data.forEach((clinic:any)=>{
            this.clientClinics.push( {
              name:clinic.name,
              address:clinic.address,
              doctors:clinic.doctors.length,
              createAt:new Date(clinic.createdAt).toLocaleDateString(),
              phone:clinic.phone
            })
        })
      },
      error:(err)=>console.log(err),
      complete:()=>console.log('request completed')
    })

    this.script
      .load('charts.js','bs-init', 'theme')
      .then((data) => {
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));
  }



  submitClinic(ngForm:NgForm){
    console.log(ngForm.value);
    const clinicModel:ClinicModel = {
        clinicName:ngForm.value.clinicName,
        clinicAddress:ngForm.value.clinicAddress,
       clinicPhone:ngForm.value.clinicPhone,
       clinicDescription:ngForm.value.clinicDescription,
       userEmail:ngForm.value.docEmail,
       userPassword:ngForm.value.docPassword,
       docName:ngForm.value.docName,
       docAge:ngForm.value.docAge,
       iswOwner:ngForm.value.docAge === 'true' ? true : false,
       assignedBy:null
    }

    this.adminClinicService.adminAddClinic(clinicModel).subscribe({
      next:(response)=>console.log(response),
      error:(err)=>console.log(err),
      complete:()=>console.log('request completed')
    })

    window.location.reload();

  }

}

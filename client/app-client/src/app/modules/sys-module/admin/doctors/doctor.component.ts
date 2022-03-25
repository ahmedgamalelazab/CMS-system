import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScriptService } from '../../services/script.store.service';
import { IClinicDoctor } from '../network interfaces/Models';
import { AdminClinicService } from '../services/admin.clinic.service';

@Component({
  selector: 'pm-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
  // providers:[ScriptService]
})
export class DoctorComponent implements OnInit {

  clinicDoctors: IClinicDoctor[];

  constructor(private script:ScriptService,private adminClinicService:AdminClinicService) {
    this.clinicDoctors = [];
  }

  ngOnInit(): void {

    this.adminClinicService.adminGetAllDoctors().subscribe({
      next:(response)=>{
        response.data.forEach((doctor: any) => {
          this.clinicDoctors.push({
            name: doctor.name,
            age: doctor.age,
            assignedBy: doctor.assignedBy,
            createdAt: new Date(doctor.createdAt).toLocaleDateString(),
            id: doctor._id,
            isConnectedToClinic: doctor.isConnectedToClinic,
            isOwner: doctor.isOwner === true ? 'YES' : 'NO',
            profileImage: doctor.profileImage,
            updatedAt: new Date(doctor.updatedAt).toLocaleDateString(),
            user: doctor.user,
          });
        });
      },
      error:(err)=>console.log(err),
      complete:()=>console.log(`get all doctors request has completed`)
    })

    this.script
      .load('charts.js','bs-init', 'theme')
      .then((data) => {
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));
  }

  onDoctorItemClick(doctor:Element){

  }

  submitDoctor(ngForm:NgForm){

  }




}

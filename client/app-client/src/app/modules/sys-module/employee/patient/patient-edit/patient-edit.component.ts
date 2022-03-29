import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from './../../_model/patient';
import { PatientService } from './../../services/patient.service';

@Component({
  selector: 'pm-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  patient:Patient|null = null;

  constructor(private ar:ActivatedRoute, private patientSer:PatientService, private router:Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(a =>{
      this.patientSer.getPatientById(a["id"])
        .subscribe({
          next:res => {this.patient = res.data;console.log(res.data)},
          error:e=>console.warn(e),
        });
    })
  }
  save(){
      if(this.patient!=null){
        this.patientSer.editPatient(this.patient).subscribe({
          next:res=>{
            console.log(res);
            alert("Patient has been edited successfully!");
            this.router.navigateByUrl("/employee/patient");
          },
          error:e=>{
            console.warn(e);
            alert("Error while editing patient data, Please try again!");
          }
        });
      }
  }

}

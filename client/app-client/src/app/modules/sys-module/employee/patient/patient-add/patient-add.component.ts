import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../_model/patient';

@Component({
  selector: 'pm-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  newPatient:Patient=new Patient('','','',0,'','62383abbb4e95f6ecff455a1','','');

  constructor(private patientSer:PatientService,private router:Router) { 
  }
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(0),
    gender: new FormControl(''),
    clinic: new FormControl(''),
    phone: new FormControl(''),
    profileImage: new FormControl(''),
  });
  ngOnInit(): void {

  }

  save(){
    if(this.checkValidPatientData(this.newPatient)){
      console.log('here');
      this.patientSer.addPatient(this.newPatient).subscribe({
        next:(res)=>{
          console.log(res.data)
          alert("New Patient has been added successfully!");
          this.router.navigateByUrl("/employee/patient");
        },
        error:(e)=>console.error(e)
      });
    }
  }

  checkValidPatientData(patient:Patient):boolean{
    if(patient.firstName == ''||patient.lastName == ''||patient.age == 0||patient.gender == ''||patient.phone == ''){
      return false;
    }
    return true;
  }

}

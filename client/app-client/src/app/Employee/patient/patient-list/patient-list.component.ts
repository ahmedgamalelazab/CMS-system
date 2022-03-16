import { Component, OnInit } from '@angular/core';
import { Patient } from './../../_model/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  page: number = 1;

  mainPatientList:Patient[] = []; 
  patientList:Patient[] = [];

  constructor(private patientService:PatientService) {
    this.patientService.getAllPatients()
    .subscribe({
      next:pts=> {this.mainPatientList = pts;this.patientList=pts},
      error:e => console.error("Error get data"),
      complete:()=> console.log("Completed")
    });
    console.log(this.patientList.length)
  }

  ngOnInit(): void {
    
  }

  searchPatient(name:string){
    if(name.length == 0){
      this.patientList = this.mainPatientList;
      return;
    }

    this.patientList = [];
    this.mainPatientList.forEach(element => {
      if((element.first_name.toLowerCase()+" "+element.last_name.toLowerCase()).startsWith(name.toLowerCase()))
        this.patientList.push(element);
    });

  }

}

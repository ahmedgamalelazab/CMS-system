import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/_model/patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {


  mainPatientList:Patient[] = [
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
    new Patient(1,"Patient Name",25,"010-111-2224","/assets/img/avatars/avatar3.jpeg"),
  ]; 

  patientList:Patient[] = this.mainPatientList;

  constructor() { }

  ngOnInit(): void {
  }

  searchPatient(name:string){
    if(name.length == 0){
      this.patientList = this.mainPatientList;
      return;
    }

    this.patientList = [];
    this.mainPatientList.forEach(element => {
      if(element.name.toLowerCase().startsWith(name.toLowerCase()))
        this.patientList.push(element);
    });

  }

}

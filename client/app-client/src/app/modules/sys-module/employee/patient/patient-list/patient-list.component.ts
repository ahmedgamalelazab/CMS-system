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
    this.patientService.getAllClinicPatients('62383abbb4e95f6ecff455a1')  // will be edited
    .subscribe({
      next:res=> {console.log(res);this.mainPatientList = res.data;this.patientList=res.data},
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
      if((element.firstName.toLowerCase()+" "+element.lastName.toLowerCase()).startsWith(name.toLowerCase()))
        this.patientList.push(element);
    });

  }

  deleteStudent(selectedPatient:Patient){
    if(!confirm("Are you sure you want to delete this patient?"))
      return;
    this.patientService.removePatient(selectedPatient).subscribe({
      next:(res)=>console.log(res.data),
      error:(e)=>console.error(e),
    });
    
    // this.patientService.getAllClinicPatients('62383abbb4e95f6ecff455a1') //// will be edited
    //   .subscribe(patients => this.mainPatientList = patients);
    
    // this.patientList = this.mainPatientList;

    location.reload();
  }

}

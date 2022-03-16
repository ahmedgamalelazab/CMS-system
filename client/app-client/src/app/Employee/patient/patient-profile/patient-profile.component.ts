import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/_model/patient';
import { PatientService } from './../../services/patient.service';
import { PrescriptionService } from './../../services/prescription.service';
import { Prescription } from './../../../_model/prescription';
import { Appointment } from './../../../_model/appointment';

@Component({
  selector: 'pm-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  page: number = 1;

  patient:Patient|null = new Patient(1,"Camile","Esseby",72,"Female"
                          ,"17/06/2021","600-154-2651"
                          ,"https://robohash.org/earumrerumrepudiandae.png?size=250x250&set=set1");


  patientAppointments:Appointment[] = [
    new Appointment(1,"Rriocard Minchindon","10/02/2022","1:29 PM"),
    new Appointment(2,"Hamish Posten","25/02/2022","1:37 PM")
  ]
  patientPrescreptions:Prescription[] = [];
  constructor(private patientServ:PatientService,private prescServ:PrescriptionService, private ar:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    
    this.ar.params.subscribe(
      {
        next:p=>{
          console.error(p['id']);
          this.patientServ.getPatientById(p['id']).then(res=>this.patient = res);
          console.log("THIS IS THE PATIENT: "+this.patient);
        }
  })

    $('#hr').hide();
    $(window).on('resize',function(e){
      if(this.innerWidth <= 576){
        $('#hr').show();
      }else{
        $('#hr').hide();
      }
    })

    // this.ar.params.subscribe(a=>{
    //   this.patientServ.getPatientById(a['id']).then(a=>this.patient = a);
    // })
  }

  calcTotalPaid():Number{
    let totalMoney = 0;
    for (let i = 0; i < this.patientPrescreptions.length; i++) {
      const element = this.patientPrescreptions[i];
      totalMoney += Number((element.price).replace('$', ""));
    }
    return totalMoney;
  }

}

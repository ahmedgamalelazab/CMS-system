import { Component, OnInit } from '@angular/core';
import { Appointment } from './../../_model/appointment';
import { AppointmentsService } from './../../services/appointments.service';
import { data } from 'jquery';
import { PrescriptionService } from './../../services/prescription.service';
import { ScriptService } from './../../../services/script.store.service';
import { Prescription } from '../../../doctor/_models/Prescription';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todayAppointments:Appointment[] = [];
  pendingPrescriptions:any = [];
  selectedPres:any = new Prescription("", "", "", "", [""], new Date(), false, 0, "cash", false, new Date(), new Date());
  

  constructor(private appointServ:AppointmentsService, private presServ:PrescriptionService, 
    private script: ScriptService) { }

  ngOnInit(): void {
    this.script
      .load('charts.js', 'bs-init', 'theme')
      .then((data) => {
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));

    this.getData();
    // setInterval(()=>this.getPendingPrescriptions(),1000);
  }

  getData(){
    let todayDate = new Date();
    var dd = String(todayDate.getDate()).padStart(2, '0');
    var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = todayDate.getFullYear();

    let today = yyyy + '-' + mm + '-' + dd;
    console.log(today);

    this.appointServ.getClinicAppointmentsController().subscribe({
      next:res=>{
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          if(element.date.split('T')[0] === today)
            this.todayAppointments.push(element);
        }
      },
      error:e=>console.warn(e)
    })
    this.getPendingPrescriptions();
  }

  getPendingPrescriptions(){
    this.presServ.getPendingPrescriptions().subscribe({
      next:res=>{this.pendingPrescriptions = res.data},//console.log(this.pendingPrescriptions)},
      error:e=>console.warn(e)
    })
  }

  setSelectedPrescription(presc:any){
    this.selectedPres = presc;
  }

  submitPresPayment(){
    this.selectedPres.hasPayed = true;
    this.presServ.editPrescription(this.selectedPres).subscribe({
      next:res=>alert('prescription has been payed successfully!'),
      error:e=>console.error(e)
    })
  }

}

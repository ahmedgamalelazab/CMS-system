import { Injectable } from "@angular/core";
import { IClinicDoctor } from "../network interfaces/Models";


@Injectable({
  providedIn:'root'
})
export class AdminClinicDoctorsStateStoreService {

  clinicDoctor:IClinicDoctor;

  constructor(){
    //initial state
    this.clinicDoctor = {
      age:'',
      assignedBy:'',
      createdAt:'',
      id:'',
      isConnectedToClinic:false,
      isOwner:'',
      name:'',
      profileImage:'',
      updatedAt:'',
      user:''
    };
  }

  updateClinicDoctorState(clinicDoctor:IClinicDoctor){
    this.clinicDoctor = clinicDoctor;
  }

  getClinicDoctor():IClinicDoctor{
    return this.clinicDoctor;
  }

}

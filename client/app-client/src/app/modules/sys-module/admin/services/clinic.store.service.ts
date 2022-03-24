import { Injectable } from "@angular/core";
import { ClinicClientInTable, IClinicState } from "../network interfaces/Models";



@Injectable({
  providedIn:'root'
})
export class ClinicStateStoreService{

  clinicStoreState:IClinicState;

  constructor(){
    this.clinicStoreState = {
      clinicId : '' //initial state
      ,clinicObj:null
    }
  }


  pushClinicId(clinicId:string){
    this.clinicStoreState.clinicId = clinicId;
  }

  pushClinicObject(clinicObject:ClinicClientInTable){
    this.clinicStoreState.clinicObj = clinicObject;
  }

  getClinicId():string{
    return this.clinicStoreState.clinicId;
  }

  getClinicObject(){
    return this.clinicStoreState.clinicObj;
  }



}

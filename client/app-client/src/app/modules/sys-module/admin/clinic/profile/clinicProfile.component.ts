import { Component, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IClinicPayload } from "../../network interfaces/Models";
import { AdminClinicService } from "../../services/admin.clinic.service";
import { ClinicStateStoreService } from "../../services/clinic.store.service";



@Component({
  selector: 'pm-clinicProfile',
  templateUrl: './clinicProfile.component.html',
  styleUrls: ['./clinicProfile.component.css'],
})
export class ClinicProfileComponent implements OnInit{

  constructor(public clinicStoreService:ClinicStateStoreService , private adminClinicService:AdminClinicService,private router:Router,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {

  }


  //this is deleting the clinic using the id that been stored in the state store
  deleteClinic(){
      if(confirm('are u sure u wanna delete this clinic ? ')){
        const clinicId = this.clinicStoreService.getClinicId(); // clinic id
        this.adminClinicService.adminDeleteClinic(clinicId).subscribe({
          next:(response)=>{
            if(response.success){
              console.log("deleted clinic");
              this.router.navigate(['clinics'], {
                relativeTo: this.activatedRoute.parent,
              });
            }else{
              console.log('Problem with the deleting process');
            }
          }
        })
      }else{
        console.log("deleting process canceled");
      }
  }

  updateClinic(clinicName:NgModel,clinicAddress:NgModel,clinicPhone:NgModel,clinicDescription:NgModel,clinicOwner:NgModel,){
      const payload:IClinicPayload = {
        clinicName:clinicName.value,
        clinicAddress:clinicAddress.value,
        clinicPhone:clinicPhone.value,
        clinicDescription:clinicDescription.value,
        owner:clinicOwner.value.toString() === '' ?  this.clinicStoreService.getClinicObject()?.owner._id : clinicOwner.value.toString(),
      }
      console.log(payload);
      this.adminClinicService.adminUpdateClinic(payload,this.clinicStoreService.getClinicId()).subscribe({
        next:(response)=>{
          //TODO HANDLE THE SUCCESS STATE AT ALL CASES + DONT'T FORGET ROUTE GUARDING
          if(response.success){
              console.log("updated");
              this.router.navigate(['clinics'], {
                relativeTo: this.activatedRoute.parent,
              });

          }else{
            console.log('update failed');
          }
        }
      })
  }


}

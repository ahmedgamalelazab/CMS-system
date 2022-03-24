import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { IClinicDoctor } from '../../network interfaces/Models';
import { AdminClinicService } from '../../services/admin.clinic.service';
import { ClinicStateStoreService } from '../../services/clinic.store.service';

@Component({
  selector: 'pm-clinicDoctors',
  templateUrl: './clinicDoctors.component.html',
  styleUrls: ['./clinicDoctors.component.css'],
})
export class ClinicDoctorsComponent implements OnInit {
  clinicDoctors: IClinicDoctor[];

  constructor(
    private ClinicStoreState: ClinicStateStoreService,
    private adminClinicService: AdminClinicService
  ) {
    this.clinicDoctors = [];
  }

  ngOnInit(): void {
    //make http request to get all the doctors
    this.adminClinicService
      .adminGetClinicDoctors(this.ClinicStoreState.getClinicId())
      .subscribe({
        next: (response) => {
          //HANDLE THE RESPONSE ERRORS OF UNDEFINED
          response.data.forEach((doctor: any) => {
            this.clinicDoctors.push({
              name: doctor.name,
              age: doctor.age,
              assignedBy: doctor.assignedBy,
              createdAt: new Date(doctor.createdAt).toLocaleDateString(),
              id: doctor._id,
              isConnectedToClinic: doctor.isConnectedToClinic,
              isOwner: doctor.isOwner === true ? 'YES' : 'NO',
              profileImage: doctor.profileImage,
              updatedAt: new Date(doctor.updatedAt).toLocaleDateString(),
              user: doctor.user,
            });
          });
        },
        error: (err) => console.log(err),
        complete: () => console.log('get all doctors request completed'),
      });
  }

  onDoctorItemClick(itemRef:Element){
    console.log(itemRef);
  }

  submitDoctor(ngForm: NgForm) {}
}

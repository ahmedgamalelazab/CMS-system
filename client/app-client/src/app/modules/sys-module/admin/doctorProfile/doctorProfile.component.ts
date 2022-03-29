import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminClinicService } from '../services/admin.clinic.service';
import { AdminClinicDoctorsStateStoreService } from '../services/clinicDoctors.store.service';

@Component({
  templateUrl: './doctorProfile.component.html',
  selector: 'pm-doctorProfile',
  styleUrls: ['./doctorProfile.component.css'],
})
export class DoctorProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('doctorProfileImagePicker') doctorProfileImagePicker: any;
  @ViewChild('doctorProfileImagePickerElement')
  doctorProfileImagePickerElement: any;
  @ViewChild('doctorProfileImageURL') doctorProfileImageURL: any;
  @ViewChild('doctorProfileImage') doctorProfileImage: any;

  constructor(
    public adminClinicDoctorsStoreService: AdminClinicDoctorsStateStoreService,
    private adminClinicService: AdminClinicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    console.log(this.doctorProfileImagePicker);
    this.doctorProfileImagePicker.valueChanges.subscribe({
      next: (value: any) => {
        console.log(value);
        console.log(this.doctorProfileImageURL.value);
        this.doctorProfileImageURL.reset(value);
      },
    });
  }

  ngOnInit(): void {
    //load the profile
  }

  updateDoctorData(
    doctorName: NgModel,
    doctorEmail: NgModel,
    doctorPassword: NgModel,
    doctorProfileURL: NgModel,
    doctorProfileImagePicker: NgModel
  ) {
    console.log(this.doctorProfileImagePickerElement.nativeElement.files);
    console.log(doctorProfileImagePicker.value);
    console.log(doctorName.value);
    console.log(doctorEmail.value);
    console.log(doctorPassword.value);
    console.log(this.adminClinicDoctorsStoreService.getClinicDoctor().id);
    //TODO use formData to load the payload with the required data to update the Doctor images
    const formPayload = new FormData();
    console.log(this.doctorProfileImagePickerElement.nativeElement.files[0]);
    formPayload.append(
      'doctorProfileImage',
      this.doctorProfileImagePickerElement.nativeElement.files[0],
      this.doctorProfileImagePickerElement.nativeElement.files[0].name
    );
    formPayload.append(
      'doctorName',
      doctorName.value === ''
        ? this.adminClinicDoctorsStoreService.getClinicDoctor().name
        : doctorName.value
    );
    formPayload.append(
      'doctorEmail',
      doctorEmail.value === ''
        ? this.adminClinicDoctorsStoreService.getClinicDoctor().user.email
        : doctorEmail.value
    );
    formPayload.append(
      'doctorPassword',
      doctorPassword.value === ''
        ? this.adminClinicDoctorsStoreService.getClinicDoctor().user.password
        : doctorPassword.value
    );
    const doctorId = this.adminClinicDoctorsStoreService.getClinicDoctor().id;
    // console.log(formPayload.get('doctorProfileImage'));
    // console.log(formPayload.get('doctorName'));
    // console.log(formPayload.get('doctorEmail'));
    // console.log(formPayload.get('doctorPassword'));
    //go do the request
    //TODO DO UPLOAD REQUEST
    //formPayload will be the payload , and the id will be the id of the doctor to update his profile data
    this.adminClinicService
      .adminUpdateDoctorData(formPayload, doctorId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate([`doctors`], {
              relativeTo: this.activatedRoute.parent,
            });
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('doctor data updated'),
      });
  }

  deleteDoctor() {
    if(confirm('are u sure u wanna delete this doctor ? ')){
      const doctorId = this.adminClinicDoctorsStoreService.getClinicDoctor().id;
    this.adminClinicService.adminDeleteDoctor(doctorId).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate([`doctors`], {
            relativeTo: this.activatedRoute.parent,
          });
        }
      },
      error:(err)=>console.log(err),
      complete:()=>console.log('deleting doctor request completed')
    });
    }else{
      console.log("deleting process stopped");
    }
  }
}

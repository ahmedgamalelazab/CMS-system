import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptService } from '../../../services/script.store.service';
import {
  ClinicClientInTable,
  ClinicModel,
} from '../../network interfaces/Models';
import { AdminClinicService } from '../../services/admin.clinic.service';
import { ClinicStateStoreService } from '../../services/clinic.store.service';

@Component({
  selector: 'pm-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css'],
})
export class ClinicsComponent implements OnInit {
  constructor(
    private script: ScriptService,
    private adminClinicService: AdminClinicService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clinicStoreState:ClinicStateStoreService
  ) {}

  clientClinics: ClinicClientInTable[] = [];

  clinicId: string = '';

  ngOnInit(): void {
    this.adminClinicService.adminGelAllClinics().subscribe({
      next: (response) => {
        response.data.forEach((clinic: any) => {
          this.clientClinics.push({
            id: clinic._id,
            name: clinic.name,
            address: clinic.address,
            doctors: clinic.doctors.length,
            createAt: new Date(clinic.createdAt).toLocaleDateString(),
            phone: clinic.phone,
            description:clinic.description,
            owner:clinic.owner
          });
        });
      },
      error: (err) => console.log(err),
      complete: () => console.log('request completed'),
    });

    this.script
      .load('charts.js', 'bs-init', 'theme')
      .then((data) => {
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));
  }

  submitClinic(ngForm: NgForm) {
    console.log(ngForm.value);
    const clinicModel: ClinicModel = {
      clinicName: ngForm.value.clinicName,
      clinicAddress: ngForm.value.clinicAddress,
      clinicPhone: ngForm.value.clinicPhone,
      clinicDescription: ngForm.value.clinicDescription,
      userEmail: ngForm.value.docEmail,
      userPassword: ngForm.value.docPassword,
      docName: ngForm.value.docName,
      docAge: ngForm.value.docAge,
      iswOwner: ngForm.value.docAge === 'true' ? true : false,
      assignedBy: null,
    };

    this.adminClinicService.adminAddClinic(clinicModel).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
      complete: () => console.log('request completed'),
    });

    // window.location.reload();
  }

  onClinicItemClick(itemRef: Element) {
    //initially i need to display the clinic id
    //when i click on each row .. i can get the id of the clinic that will let me display all the clinic data as admin
    this.clinicId = itemRef.children[0].innerHTML.toString();
    console.log(this.clinicId);
    // alert(itemRef.children[0].innerHTML.toString());
    this.clinicStoreState.pushClinicId(this.clinicId);
    this.clinicStoreState.pushClinicObject(this.clientClinics.filter((clinic)=>{
       return clinic.id === this.clinicId;
    })[0]);
  }

  switchToClinicDoctors() {
    this.router.navigate(['doctors'], {
      relativeTo: this.activatedRoute.parent,
    });
  }
  switchToClinicProfile() {
    this.router.navigate(['profile'], {
      relativeTo: this.activatedRoute.parent,
    });
  }
  switchToClinicEmployees() {
    this.router.navigate(['employees'], {
      relativeTo: this.activatedRoute.parent,
    });
  }
}

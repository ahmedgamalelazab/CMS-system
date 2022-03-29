import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from './../../../services/doctor.service';
import { Doctor } from './../../../_models/doctor';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pm-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  doctorId:string = "";
  constructor(private docService: DoctorService, public router: Router, public route: ActivatedRoute) { }
  editedDoctor: Doctor = new Doctor('', '', 0, '', true, '', '', true, '', '');
  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id')??'';
    this.docService.getDoctorById(this.doctorId).subscribe({
      next:res=>{
        this.editedDoctor = res.data;
        console.log(res)
      },
      error:e=>console.warn(e)
    })
  }
  save() {
    this.docService.editDoctor(this.doctorId, this.editedDoctor).subscribe(response => {
      this.router.navigateByUrl('/clinic-owner/doctor');
    })
  }
}

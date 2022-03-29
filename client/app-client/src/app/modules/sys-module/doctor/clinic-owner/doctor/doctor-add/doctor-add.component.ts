import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from './../../../services/doctor.service';
import { Doctor } from './../../../_models/doctor';

@Component({
  selector: 'pm-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {
  newDoctor: Doctor = new Doctor('0', '', 0, '', true, '', '', true, '', '');
  // flag: boolean = true;
  constructor(private docService: DoctorService, public router: Router) { }

  ngOnInit(): void {
  }
  save() {
    this.docService.addNewDoctor(this.newDoctor).subscribe({
      next:res=>{
        console.log(res);
        if(res.success == true){
          alert("Doctor Added successfully!")
          this.router.navigateByUrl("/clinic-owner/doctor");
        }
        
      },
      error:e=>console.warn(e),
    });
  }
}

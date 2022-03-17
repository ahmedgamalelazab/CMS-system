import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { Doctor } from 'src/app/_models/doctor';

@Component({
  selector: 'pm-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {
  newDoctor: Doctor = new Doctor(0, '', 30, 1000);
  // flag: boolean = true;
  constructor(private docService: DoctorService) { }

  ngOnInit(): void {
  }
  save() {
    this.docService.addNewDoctor(this.newDoctor);
  }
}

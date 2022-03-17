import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { Doctor } from 'src/app/_models/doctor';

@Component({
  selector: 'pm-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {
  // @Input() doctor: Doctor | null = null;
  doctor: Doctor = new Doctor(0, '', 0, 0)
  constructor(private docService: DoctorService) { }

  ngOnInit(): void {
  }
  save() {
    this.docService.editDoctor(this.doctor);
  }

}

import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { Doctor } from 'src/app/_models/doctor';

@Component({
  selector: 'pm-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  @Output() docEvent = new EventEmitter<Doctor>();
  @Output() actionEvent = new EventEmitter<string>();
  constructor(private docService: DoctorService) { }

  ngOnInit(): void {
    this.doctors = this.docService.getAllDoctors();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.doctors = this.docService.getAllDoctors();
  }

  addDoctor() {
    this.actionEvent.emit("add");
  }

  editDoctor(selectedDoc: Doctor) {
    this.docEvent.emit(selectedDoc);
    this.actionEvent.emit("edit");
  }

  deleteDoctor(selectedDoc: Doctor) {
    this.docService.removeDoctor(selectedDoc);
    this.doctors = this.docService.getAllDoctors();
    this.docService.selectedDoctor = null;
    this.actionEvent.emit("");
  }

  searchPatient(name: string) {
    if (name.length == 0) {
      this.doctors = this.docService.getAllDoctors();
      return;
    }

    this.doctors = [];
    this.docService.getAllDoctors().forEach(element => {
      if (element.Name.toLowerCase().startsWith(name.toLowerCase()))
        this.doctors.push(element);
    });
  }

}



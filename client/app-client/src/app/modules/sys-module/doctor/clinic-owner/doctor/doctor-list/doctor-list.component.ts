import { Component, OnInit } from '@angular/core';
import { DoctorService } from './../../../services/doctor.service';
import { Doctor } from './../../..//_models/doctor';

@Component({
  selector: 'pm-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  doctorsList: Doctor[] = [];
  constructor(private docService: DoctorService) { }

  doctor: Doctor = new Doctor(' ', '', 0, '', true, '', '', true, '', '');

  ngOnInit(): void {
    this.docService.getAllDoctors()
      .subscribe({
        next: response => {
          if (response.success) {
            this.doctors = response.data;
            this.doctorsList = response.data;
          } else {
            //handle this case
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('request sent and receied well')
      })
  }

  // Search 
  searchDoctor(name: string) {
    if (name.length == 0) {
      this.doctorsList = this.doctors;
      return;
    }

    this.doctorsList = [];
    this.doctors.forEach(element => {
      if (element.name.toLowerCase().startsWith(name.toLowerCase()))
        this.doctorsList.push(element);
    });
  }

  deleteDoctor(doctorId: string) {
    if (confirm("Delete doctor, Are you sure?")) {
      this.docService.removeDoctor(doctorId).subscribe(() => {
        this.doctorsList = this.doctorsList.filter(el => el._id !== doctorId);
      })
    }
  }

  // deleteDoctor(doctorId: string) {
  //   this.docService.deleteMedicine(doctorId).subscribe(() => {
  //     this.doctorsList = this.doctorsList.filter(el => el._id !== doctorId);
  //   })
  // }

  // addDoctor() {
  //   this.actionEvent.emit("add");
  // }

  // editDoctor(selectedDoc: Doctor) {
  //   this.docEvent.emit(selectedDoc);
  //   this.actionEvent.emit("edit");
  // }

  // deleteDoctor(selectedDoc: Doctor) {
  //   this.docService.removeDoctor(selectedDoc);
  //   this.doctors = this.docService.getAllDoctors();
  //   this.docService.selectedDoctor = null;
  //   this.actionEvent.emit("");
  // }

  // searchPatient(name: string) {
  //   if (name.length == 0) {
  //     this.doctors = this.docService.getAllDoctors();
  //     return;
  //   }

  //   this.doctors = [];
  //   this.docService.getAllDoctors().forEach(element => {
  //     if (element.Name.toLowerCase().startsWith(name.toLowerCase()))
  //       this.doctors.push(element);
  //   });
  // }

}



import { Injectable } from '@angular/core';

import { Doctor } from "./_models/doctor";

@Injectable({
  providedIn: 'root'
})


export class DoctorService {
  public selectedDoctor: Doctor | null = null;
  private doctors: Doctor[] = [
    new Doctor(1, "Ahmed Gamal", 39, 10000),
    new Doctor(2, "Mostafa Medhat", 38, 10000),
    new Doctor(3, "Reem Khalil", 35, 10000),
    new Doctor(4, "Hadeer Elsayed", 35, 10000),
    new Doctor(5, "Khaled Salem", 35, 10000),
    new Doctor(6, "Omar Mohamed", 38, 10000),
    new Doctor(7, "Yasser Abdelhady", 38, 10000)
  ]

  addNewDoctor(newDoc: Doctor) {
    this.doctors.push(new Doctor(newDoc.Id, newDoc.Name, newDoc.Age, newDoc.Salary));
  }

  getAllDoctors() {
    return this.doctors;
  }

  getDoctorById(id: number): Doctor | null {
    for (let i = 0; i < this.doctors.length; i++) {
      if (this.doctors[i].Id == id)
        return new Doctor(this.doctors[i].Id, this.doctors[i].Name, this.doctors[i].Age, this.doctors[i].Salary);
    }
    return null;
  }

  editDoctor(editDoc: Doctor) {
    this.doctors.forEach(doctor => {
      if (doctor.Id == editDoc.Id) {
        doctor.Name = editDoc.Name;
        doctor.Age = editDoc.Age;
        doctor.Salary = editDoc.Salary;
      }
    });
  }

  removeDoctor(removeDoc: Doctor) {
    this.doctors = this.doctors.filter((doctor) => {
      return doctor.Id != removeDoc.Id;
    })
  }

  constructor() { }
}

import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { EmployeeService } from '../employee.service';
import { Doctor } from '../_models/doctor';
import { Employee } from '../_models/employee';



@Component({
  selector: 'pm-clinic-owner',
  templateUrl: './clinic-owner.component.html',
  styleUrls: ['./clinic-owner.component.css']
})
export class ClinicOwnerComponent implements OnInit {
  selectedDoc: Doctor | null = null;
  docAction: string = "";

  selectedEmp: Employee | null = null;
  empAction: string = "";

  constructor(private docService: DoctorService, private empService: EmployeeService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onDocEvent(doctor: Doctor) {
    this.selectedDoc = doctor;
  }

  onDocActionEvent(action: string) {
    this.docAction = action;
  }

  onEmpEvent(employee: Employee) {
    this.selectedEmp = employee;
  }

  onEmpActionEvent(action: string) {
    this.empAction = action;
  }

}

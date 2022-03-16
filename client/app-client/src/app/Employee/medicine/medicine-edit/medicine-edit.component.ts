import { Component, Input, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/medicine.service';
import { Medicine } from 'src/app/_model/medicine';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-medicine-edit',
  templateUrl: './medicine-edit.component.html',
  styleUrls: ['./medicine-edit.component.css']
})
export class MedicineEditComponent implements OnInit {


  constructor(private medSer: MedicineService, public router: Router) { }

  editedMedicine: Medicine = new Medicine(0, "", 0);
  ngOnInit(): void {
    this.editedMedicine = this.medSer.getMedicineByID(this.medSer.medicineId);
  }
  SaveEditedMedicine() {
    this.medSer.editMedicine(this.editedMedicine);
    this.router.navigate(['medicine'])
  }
}
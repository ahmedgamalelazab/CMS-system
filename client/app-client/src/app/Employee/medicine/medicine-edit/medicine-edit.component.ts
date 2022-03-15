import { Component, Input, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/medicine.service';
import { Medicine } from 'src/app/_model/medicine';

@Component({
  selector: 'pm-medicine-edit',
  templateUrl: './medicine-edit.component.html',
  styleUrls: ['./medicine-edit.component.css']
})
export class MedicineEditComponent implements OnInit {


  constructor(private medSer: MedicineService) { }
  @Input() editedMedicine: Medicine = new Medicine(0, "", 0);

  ngOnInit(): void {
  }
  SaveEditedMedicine() {
    this.medSer.editMedicine(this.editedMedicine);
  }
}
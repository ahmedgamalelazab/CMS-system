import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicineService } from 'src/app/medicine.service';
import { Medicine } from 'src/app/_model/medicine';

@Component({
  selector: 'pm-medicine-add',
  templateUrl: './medicine-add.component.html',
  styleUrls: ['./medicine-add.component.css']
})
export class MedicineAddComponent implements OnInit {

  newMedicine: Medicine = new Medicine(0, "", 0);
  constructor(private medSer: MedicineService, public router: Router) { }
  save() {
    this.medSer.AddMedicine(this.newMedicine);
    this.router.navigate(['medicine'])
  }

  ngOnInit(): void {
  }

}

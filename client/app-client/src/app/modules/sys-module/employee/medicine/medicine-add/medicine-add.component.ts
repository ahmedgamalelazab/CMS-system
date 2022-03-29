import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicineService } from './../../services/medicine.service';
import { Medicine } from './../../_model/medicine';

@Component({
  selector: 'pm-medicine-add',
  templateUrl: './medicine-add.component.html',
  styleUrls: ['./medicine-add.component.css']
})
export class MedicineAddComponent implements OnInit {

  newMedicine: Medicine = new Medicine('0', "", 0);
  constructor(private medSer: MedicineService, public router: Router) { }

  save() {
    this.medSer.AddMedicine(this.newMedicine).subscribe({
      next:(res)=>{console.log(res);this.router.navigate(['/employee/medicine'])},
      error:(e)=>console.warn(e)
    });
  }

  ngOnInit(): void {
  }

}

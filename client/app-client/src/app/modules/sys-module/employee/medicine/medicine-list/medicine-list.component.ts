import { Component, OnInit } from '@angular/core';
import { MedicineService } from './../../services/medicine.service';
import { Medicine } from './../../_model/medicine';

@Component({
  selector: 'pm-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  medicines: Medicine[] = [];
  medicineList: Medicine[] = [];
  constructor(private medSer: MedicineService) {

  }

  ngOnInit(): void {
    this.medSer.getAllMedicinesObservable()
      .subscribe({
        next: response => {
          if (response.success) {
            this.medicines = response.data;
            this.medicineList = response.data;
          } else {
            //handle this case
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('request sent and receied well')
      },

      )

  }
  // Search 
  searchMedicine(name: string) {
    if (name.length == 0) {
      this.medicineList = this.medicines;
      return;
    }

    this.medicineList = [];
    this.medicines.forEach(element => {
      if (element.name.toLowerCase().startsWith(name.toLowerCase()))
        this.medicineList.push(element);
    });
  }//end of search

  PassID(medId: number) {
    this.medSer.medicineId = medId;

  }

  DeleteMedicine(medId: string) {
    if(!confirm("Are you sure you want to delete this medicine?"))
      return;
    this.medSer.deleteMedicine(medId).subscribe(() => {
      this.medicineList = this.medicineList.filter(el => el._id !== medId);
    })
  }
  //End of delete
  // DeleteMedicine(medId: string) {
  //   console.log(medId);
  //   this.medSer.deleteMedicine(medId);
  // }//End of delete

}

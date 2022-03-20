import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/medicine.service';
import { Medicine } from 'src/app/_model/medicine';

@Component({
  selector: 'pm-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  constructor(private medSer: MedicineService) { }

  medicines: Medicine[] = this.medSer.getAllMedicines();
  medicineList: Medicine[] = this.medicines;
  medicine: Medicine = new Medicine(0, "", 0);

  ngOnInit(): void {
  }
  //Search 
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
  DeleteMedicine(medId: number) {
    for (let i = 0; i < this.medicines.length; i++) {
      if (this.medicines[i].id == medId) {
        this.medicines.splice(i, 1);
      }
    }
    console.log(this.medicines);

  }//End of delete




}



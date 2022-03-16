import { Injectable } from '@angular/core';
import { Medicine } from './_model/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {


  private medicines: Medicine[] = [
    new Medicine(1, "CHLORIDE INJECTION", 170),
    new Medicine(2, "ALMIRAL", 219),
    new Medicine(3, "ALMOVITAE", 137),
    new Medicine(4, "AMLOPHAR", 76)
  ];
  medicineId: number = 1;
  constructor() { }
  //***********Get********* */
  getAllMedicines(): Medicine[] {
    return this.medicines;
  }
  //***********Add********* */
  AddMedicine(med: Medicine) {
    this.medicines.push(new Medicine(med.id, med.name, med.price));
    console.log("Medicine Added");
  }
  //***********Get by Id********* */ 
  getMedicineByID(id: number): Medicine {
    for (let i = 0; i < this.medicines.length; i++) {
      if (this.medicines[i].id == id) {
        return new Medicine(this.medicines[i].id, this.medicines[i].name, this.medicines[i].price)

      }
    }
    return new Medicine(0, "", 0);
  }// end of get by Id

  editMedicine(eMed: Medicine) {
    for (let i = 0; i < this.medicines.length; i++) {
      if (this.medicines[i].id == eMed.id) {
        this.medicines[i].name = eMed.name;
        this.medicines[i].price = eMed.price;
        return
      }
    }
  }// end of edit


}

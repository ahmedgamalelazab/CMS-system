import { Injectable } from '@angular/core';
import { Doctor } from './_model/doctor';
import { Medicine } from './_model/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor() { }

  private medicines: Medicine[] = [
    new Medicine(1, "CHLORIDE INJECTION", 170),
    new Medicine(2, "ALMIRAL", 219),
    new Medicine(3, "ALMOVITAE", 137),
    new Medicine(4, "AMLOPHAR", 76)
  ];
  private doctors: Doctor[] = [
    new Doctor(1, "Dr.Khalid", 6500),
    new Doctor(2, "Dr.Omar", 9500),
    new Doctor(3, "Dr.Salim", 5000),
    new Doctor(4, "Dr.Rana", 9900),
  ];
  medicineId: number = 1;
  //***********Get**********/
  getAllMedicines(): Medicine[] {
    return this.medicines;
  }
  //***********Get Doctors**********/
  getAllDoctors(): Doctor[] {
    return this.doctors;
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

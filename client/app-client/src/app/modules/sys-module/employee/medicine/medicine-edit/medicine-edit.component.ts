import { Component, Input, OnInit } from '@angular/core';
import { MedicineService } from './../../services/medicine.service';
import { Medicine } from './../../_model/medicine';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pm-medicine-edit',
  templateUrl: './medicine-edit.component.html',
  styleUrls: ['./medicine-edit.component.css']
})

export class MedicineEditComponent implements OnInit {

  medId: string | null = "";
  constructor(private medSer: MedicineService, public router: Router, public route: ActivatedRoute) { }

  editedMedicine: Medicine = new Medicine('0', "", 0);
  ngOnInit(): void {
    this.medId = this.route.snapshot.paramMap.get('id');
    console.log(this.medId);

    if (this.medId != null) {
      this.medSer.getMedicineByID(this.medId).subscribe({
        next: respose => {
          if (respose.success) {
            this.editedMedicine = respose.data;
          }
        }
      });

    }//end of if
  }//end of ngOnInit

  SaveEditedMedicine() {
    this.medSer.editMedicine(this.medId, this.editedMedicine).subscribe(response => {
      this.router.navigate(['/employee/medicine'])
    })
  }
}
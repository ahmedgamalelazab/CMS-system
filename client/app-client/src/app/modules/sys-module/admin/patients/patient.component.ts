import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.store.service';

@Component({
  selector: 'pm-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers:[ScriptService]
})
export class PatientComponent implements OnInit {

  constructor(private script:ScriptService) { }

  ngOnInit(): void {
    this.script
      .load('charts.js','bs-init', 'theme')
      .then((data) => {
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));

  }

}

import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.store.service';

@Component({
  selector: 'pm-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css'],
  // providers:[ScriptService]
})
export class ClinicComponent implements OnInit {

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

import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.store.service';

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ScriptService]
})
export class DashboardComponent implements OnInit {

  constructor(private script: ScriptService) {

  }


  ngOnInit(): void {
    //load the script charts.js
    //!FIX LOADING SCRIPTS MULTIPLE TIMES
    //!HINT DELETE ALL THE SCRIPTS TAG THEN LOAD THEM AGAIN EACH TIME U TARGET THIS PAGE
    this.script
    .load('charts.js','bs-init', 'theme')
    .then((data) => {
      console.log('script loaded ', data);
    })
    .catch((error) => console.log(error));
  }

}

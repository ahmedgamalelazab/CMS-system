import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScriptService } from '../services/script.store.service';

@Component({
  selector: 'pm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  // providers:[ScriptService]
})
export class AdminComponent implements OnInit, AfterViewInit {
  constructor(private script: ScriptService) {}

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    // this.script
    //   .load('charts.js','bs-init', 'theme')
    //   .then((data) => {
    //     console.log('script loaded ', data);
    //   })
    //   .catch((error) => console.log(error));
  }

}

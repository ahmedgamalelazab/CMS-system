import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScriptService } from '../services/script.store.service';

@Component({
  selector: 'pm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  // providers:[ScriptService]
})
export class AdminComponent implements OnInit, AfterViewInit {

  public data:any;

  constructor(private script: ScriptService) {}


  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.data = JSON.parse(window.localStorage.getItem('admin')?? '');
    console.log(this.data);
  }

}

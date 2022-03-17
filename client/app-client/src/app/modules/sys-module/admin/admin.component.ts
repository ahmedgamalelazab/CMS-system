import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptService } from './services/script.store.service';

@Component({
  selector: 'pm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[ScriptService]
})
export class AdminComponent implements OnInit, AfterViewInit {
  constructor(private script: ScriptService) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.script
      .load('bs-init', 'theme')
      .then((data) => {
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));
  }
}

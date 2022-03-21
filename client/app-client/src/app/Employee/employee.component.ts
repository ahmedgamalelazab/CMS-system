import { Component, OnInit } from '@angular/core';
import { ScriptService } from './services/script.store.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[ScriptService]
})
export class EmployeeComponent implements OnInit {

  constructor(private script: ScriptService) { }

  ngOnInit(): void {
    this.script
      .load('bs-init', 'theme')
      .then((data) => {
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));
  }

}

import { Component, ElementRef, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.store.service';

@Component({
  selector: 'pm-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css'],
})
export class ClinicComponent implements OnInit {

  constructor(private script:ScriptService) { }

  ngOnInit(): void {

  }


}

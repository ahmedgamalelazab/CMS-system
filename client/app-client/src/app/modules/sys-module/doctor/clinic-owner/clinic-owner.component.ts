import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.store.service';

@Component({
  selector: 'pm-clinic-owner',
  templateUrl: './clinic-owner.component.html',
  styleUrls: ['./clinic-owner.component.css'],
  // providers:[ScriptService]
})
export class ClinicOwnerComponent implements OnInit {
  constructor(private script:ScriptService) { }
  ngOnInit(): void { 
    let user = window.sessionStorage.getItem('doctor');
    if(user == null){
      // if user doesn't have auth-token
      window.location.replace("http://localhost:4200/login");
      return;
    }
    // if userType not employee
    const userData = JSON.parse(user);
    console.log(userData);
    if(userData){
      if(userData.user !== 'doctor')
      window.location.replace("http://localhost:4200/login");
    }

    this.script
      .load('bs-init', 'theme')
      .then((data) => {
        console.log('script loaded ', data);
      })
      .catch((error) => console.log(error));
  }

  logout(){ 
    window.sessionStorage.removeItem('doctor');
    window.location.replace("http://localhost:4200/login");
  }
}

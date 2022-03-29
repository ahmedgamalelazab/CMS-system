import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../sys-module/services/script.store.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[ScriptService]
})
export class EmployeeComponent implements OnInit {

  constructor(private script: ScriptService) { }
  userName:string = '';
  ngOnInit(): void {
    let user = window.sessionStorage.getItem('employee');
    if(user == null){
      // if user doesn't have auth-token
      window.location.replace("http://localhost:4200/login");
      return;
    }
    // if userType not employee
    const userData = JSON.parse(user);
    console.log(userData);
    if(userData){
      if(userData.user !== 'employee')
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
    window.sessionStorage.removeItem('employee');
    window.location.replace("http://localhost:4200/login");
  }

}

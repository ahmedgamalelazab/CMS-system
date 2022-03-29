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
    // console.log(this.data);
    let user = window.localStorage.getItem('admin');
    if(user == null){
      // if user doesn't have auth-token
      window.location.replace("http://localhost:4200/login");
      return;
    }
    // if userType not employee
    const userData = JSON.parse(user);
    console.log(userData);
    if(userData){
      if(userData.user !== 'admin')
      window.location.replace("http://localhost:4200/login");
    }
  }

  logout(){
    
    window.localStorage.removeItem('admin');
    window.location.replace("http://localhost:4200/login");
  }

}

import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


//TODO HANDLE THE FORM ERRORS


@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(ngForm:NgForm){
    console.log(ngForm.value);
    this.loginService.authUser(ngForm.value.email,ngForm.value.password).subscribe({
      next:(response)=>this.dispatchUser(response,this.router),
      error:(err)=>{
          console.log(err);
          alert(err.error.errorMessage);
        },
      complete:()=>console.log('request completed successfully')

    })
  }

  dispatchUser(response:any , router:Router){
    console.log(console.log(response));
    if(response.data.user){
      switch(response.data.user){
        case 'admin':
          // router.navigate(['/admin/dashboard']);
          console.log("hello");
          window.location.replace("http://localhost:4200/admin/Dashboard");
          window.localStorage.setItem("admin",JSON.stringify(response.data));
        break;
        case 'doctor':
          console.log('go to doctor page');
          window.location.replace("http://localhost:4200/clinic-owner/doctor");       /// Mostafa
          window.sessionStorage.setItem("doctor",JSON.stringify(response.data));    /// Mostafa
          break;
        case'employee':
        //edit here the dist
        console.log('go to employee page');
        window.location.replace("http://localhost:4200/employee/home");       /// Mostafa
        window.sessionStorage.setItem("employee",JSON.stringify(response.data));    /// Mostafa
        break;
        default:
          //error message
          break;
      }
    }else{
      console.log(response);
    }
  }


}

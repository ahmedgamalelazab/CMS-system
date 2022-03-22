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
      error:(err)=>console.log(err),
      complete:()=>console.log('request completed successfully')

    })
  }

  dispatchUser(response:any , router:Router){
    switch(response.data.user){
        case 'admin':
          // router.navigate(['/admin/dashboard']);
          console.log("hello");
          window.location.replace("http://localhost:4200/admin/Dashboard");
        break;
        case 'doctor':
          console.log('go to doctor page');
          break;
        case'employee':
        //edit here the dist
        console.log('go to employee page');
        break;
        default:
          //error message
          break;

    }
  }


}

//login service that will connect with the server

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, of, tap } from "rxjs";



@Injectable
({
  providedIn:'root'
})
export class LoginService{


    constructor(private http:HttpClient){}

    authUser(userEmail:string,userPassword:string){

      return this.http.post('http://localhost:9999/api/v1/auth/login',{
        email:userEmail,
        password:userPassword
      }).pipe(
        tap((response)=>console.log(response)),
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
             console.log(`Error: ${error.error.message}`);
          } else {
              console.log(`Error: ${error.message}`);
          }
          return of([]);
      })
      )

    }


}








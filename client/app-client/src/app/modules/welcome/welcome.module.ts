import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AboutComponent } from './components/AboutUs/about.component';
import { TryComponent } from "./components/TryIt/try.component";
import { HomeComponent } from './components/Home/home.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    AboutComponent,
    HomeComponent,

  ],
  imports:[
    RouterModule.forChild([
      {
        path:'',component:WelcomeComponent,
        children:[
          {path:'',redirectTo:'/home',pathMatch:'full'},
          {path:'home',component:HomeComponent},
          {path:'about',component:AboutComponent},
          {path:'tryIt',component:TryComponent},
        ]
      }
    ])
  ],
  providers:[]
})
export class WelcomeModule{}

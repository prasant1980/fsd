import { Component } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { AuthenticationService } from '../../services/authentication.service';
import {Observable} from 'rxjs'
import { UserService } from '../../services/user.service'; 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn$: Observable<boolean>;
  isJobView: boolean;
  userName: string;
  constructor(private routerservice: RouterService, private authservice : AuthenticationService, private userService:UserService ) {
    this.isJobView = true;
    this.userName = this.userService.GetUserId();
    console.log("a: "+this.userName);   console.log("ab: "+this.isJobView);     
  }

  ngOnInit() {    
    this.isLoggedIn$ = this.authservice.isLoggedIn;
    console.log("ac: "+this.isLoggedIn$); 
  }

  onLogout() {
    this.routerservice.routeToLogin();
  }

  onWishList(){
    this.routerservice.routeToWishList();
  }

  onDashBoard(){
    this.routerservice.routeToDashboard();
  }

  onBookMark(){
    this.routerservice.routeToBookMark();
  }
 
}
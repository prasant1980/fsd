import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterService } from '../../services/router.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent {
  
    username = new FormControl('', [ Validators.required ]);
    password = new FormControl('', [ Validators.required ]);

    public bearerToken: any;
    submitMessage = '';

    constructor(private authService: AuthenticationService, private routerService: RouterService,private userService: UserService) {
      this.authService.setBearerToken('');
      this.authService.setlocalStorageKey('current_user','');
    }

    loginSubmit() {
      if(this.username.value && this.password.value) {
        const requestParams = {
          'userId' : this.username.value,
          'userPassword' : this.password.value
        };
  
        this.authService.authenticateUser(requestParams).subscribe( res => {
          if(res && res['status'] === 'Success'){
            this.bearerToken = res['token'];
            sessionStorage.setItem("userId", res['userId']);
            this.authService.setBearerToken(this.bearerToken);
            this.userService.SaveuserId(this.username.value); 
            this.routerService.routeToDashboard();
          }
          else {
            this.submitMessage = 'error';
          }
        }, err => {
          this.submitMessage = err.error ? err.error.message : err.message;
        });
      }
    }

    get_username_error() {
      return this.username.hasError('required') ? 'User Name is required' : '';
    }

    get_password_error() {
      return this.password.hasError('required') ? 'Password is required' : '';
    }
 
}
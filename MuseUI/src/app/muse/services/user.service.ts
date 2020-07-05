import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User, UserDetails} from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class UserService {
  public userdetails : User;
  public details:UserDetails;
  detailsSubject: BehaviorSubject<UserDetails>;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.details = new UserDetails();
    this.detailsSubject = new BehaviorSubject<UserDetails>(this.details);
  }
  
  userApi :string = 'http://localhost:8084/api/v1/user/'; 

  GetUser(data : string): BehaviorSubject<UserDetails>
  {
    this.httpClient.get<UserDetails>(this.userApi+ data,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    })
    .subscribe(serverdata=>{
      this.details = serverdata;
      this.detailsSubject.next(this.details);
    });
    return this.detailsSubject;
  }

  EditUser(id:string,data:UserDetails): Observable<any>
  {
    return this.httpClient.put(this.userApi+ id, data,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  AddUser(data): Observable<any>
  {
    return this.httpClient.post(this.userApi, data,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  SaveuserId(userid)
  {
    localStorage.removeItem('current_user')
    localStorage.setItem('current_user',userid);
  }

  GetUserId():string
  {
    return localStorage.getItem('current_user');
  }  
}
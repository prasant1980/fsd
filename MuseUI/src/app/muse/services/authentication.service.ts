import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  authenticateUser(data) {
    return this.httpClient.post('http://localhost:8084/api/v1/auth/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  setlocalStorageKey(key,token) {
    localStorage.setItem(key, token);
  }
  
  getLocalStorage(key) {
    return localStorage.getItem(key);
  }

  isUserAuthenticated(token): Promise<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post('http://localhost:8084/api/v1/auth/login', {}, {
      headers : headers
    }).pipe(map((res) => res['isAuthenticated'])).toPromise();
  }

  registerUser(data) {
    return this.httpClient.post('http://localhost:8084/api/v1/auth/register', data);
  }

  get isLoggedIn() {
    if(this.getBearerToken()===null||this.getBearerToken()=='')
    {
      this.loggedIn.next(false);
      return this.loggedIn.asObservable();
    }
    else
    {
    this.loggedIn.next(true);
    return this.loggedIn.asObservable();
    }
  }
}
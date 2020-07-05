import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Job } from '../models/job';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  thirdPartyAPi: string;
  apiKey: string;
  springEndPoint: String;
  token: any;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.thirdPartyAPi = 'https://www.themuse.com/api/public/jobs?';
    this.apiKey = 'api_key=91fcf7f58da803fc060d84f338c45d7b3503b3e80b6d16412be98d8b8831a841';
    this.springEndPoint = 'http://localhost:8083/api/v1/musemanager/';
  }

  addToWishList(job: Job) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    const url = `${this.springEndPoint}` + "job";
    console.log("URL : " + url);
    job.isFavorite = true;
    return this.httpClient.post(url, job, {
      headers: headers,
      observe: "response"
    });
  }

  getAllJobsFromWishList(): Observable<Job[]> {
    const url = this.springEndPoint + "job";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    this.token = this.authService.getBearerToken();
    let formattedUrl = url + '/' + sessionStorage.getItem('userId');
    console.log("URL : " + formattedUrl);
    return this.httpClient.get<Job[]>(formattedUrl, {
      headers: headers
    });
  }

  deleteJobFromWishList(job: Job) {
    const url = this.springEndPoint + "job";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    this.token = this.authService.getBearerToken();
    let formattedUrl = url + '/' + sessionStorage.getItem('userId') + '/' + `${job.id}`;
    console.log("URL : " + formattedUrl);
    return this.httpClient.delete(formattedUrl, {
      headers: headers,
      responseType: "text"
    });
  }

  updateBookmark(job) {
    const url = this.springEndPoint + "bookmark";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    this.token = this.authService.getBearerToken();
    let formattedUrl = url + '/job/' + sessionStorage.getItem('userId') + '/' + `${job.id}`;
    console.log("URL : " + formattedUrl);
    return this.httpClient.put(formattedUrl, job, {
      headers: headers,
      observe: "response"
    });
  }

  getAllJobsFromBookmark(): Observable<Job[]> {
    const url = this.springEndPoint + "bookmark/job";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    this.token = this.authService.getBearerToken();
    let formattedUrl = url + '/' + sessionStorage.getItem('userId');
    console.log("URL : " + formattedUrl);
    return this.httpClient.get<Job[]>(formattedUrl, {
      headers: headers
    });
  }

  getAllJobData(page : number): Observable<any[]>{
    const url1 = this.springEndPoint + "job";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    this.token = this.authService.getBearerToken();
    let formattedUrl1 = url1 + '/' + sessionStorage.getItem('userId');
    console.log("get All Wishlist URL : " + formattedUrl1);
    let favoriteData = this.httpClient.get<any[]>(formattedUrl1, {
      headers: headers
    });

    const url2 = this.springEndPoint + "bookmark/job";
    let formattedUrl2 = url2 + '/' + sessionStorage.getItem('userId');
    console.log("get All Bookmark URL : " + formattedUrl2);
    let bookmarkData =  this.httpClient.get<Job[]>(formattedUrl2, {
      headers: headers
    });

    const url = this.thirdPartyAPi + this.apiKey + '&page=' + page;
    console.log("External Job URL : " + url);
    let allJobData = this.httpClient.get(url);

    return forkJoin([favoriteData, bookmarkData, allJobData]);
  }

  getPageJobData(page : number): Observable<any[]>{
    const url = this.thirdPartyAPi + this.apiKey + '&page=' + page;
    console.log("External Job URL : " + url);
    return this.httpClient.get<Job[]>(url);
  }
}

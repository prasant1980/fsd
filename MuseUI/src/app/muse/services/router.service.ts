import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

  constructor(private router: Router, private location: Location) { }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeBack() {
    this.location.back();
  }

  routeToJobView() {
    this.router.navigate(['dashboard']);
  }

  routeToWishList() {
    this.router.navigate(['wishlist']);
  }

  routeToBookMark() {
    this.router.navigate(['bookmark']);
  }
}

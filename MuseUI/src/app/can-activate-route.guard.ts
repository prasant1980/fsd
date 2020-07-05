import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './muse/services/authentication.service';
import { RouterService } from './muse/services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: RouterService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
                        Observable<boolean> | Promise<boolean> | boolean {
    const bearerToken = this.authService.getBearerToken();
    if(bearerToken) {
        return true;
    } else {
        this.router.routeToLogin();
        return false;
    }
  }
}

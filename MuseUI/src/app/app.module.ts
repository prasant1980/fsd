import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MuseModule } from './muse/muse.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './muse/services/authentication.service'
import { RouterService } from './muse/services/router.service'
import { UserService } from './muse/services//user.service'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './muse/components/login/login.component';
import { UserRegistrationComponent } from './muse/components/user-registration/user-registration.component';
import { CardContainerComponent } from './muse/components/card-container/card-container.component';
import { JobService } from './muse/services/job.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { WishingListComponent } from './muse/components/wishing-list/wishing-list.component';
import { BookmarkComponent } from './muse/components/bookmark/bookmark.component';
import { MatDialogModule } from '@angular/material/dialog';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: CardContainerComponent,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: 'registration',
    component: UserRegistrationComponent
  }
  ,
  {
    path: 'wishlist',
    component: WishingListComponent,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: 'bookmark',
    component: BookmarkComponent,
    canActivate: [CanActivateRouteGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    MuseModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [CanActivateRouteGuard, AuthenticationService, RouterService, UserService, JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }

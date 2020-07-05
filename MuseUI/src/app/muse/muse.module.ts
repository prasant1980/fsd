import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';

import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { RouterModule } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { CardComponent } from './components/card/card.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { WishingListComponent } from './components/wishing-list/wishing-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [LoginComponent, HeaderComponent, FooterComponent, UserRegistrationComponent, CardContainerComponent, CardComponent, DialogComponent, BookmarkComponent, WishingListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,    
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatPaginatorModule,
  ],
  exports: [
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    UserRegistrationComponent,
    CardContainerComponent,
    BookmarkComponent,
    WishingListComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class MuseModule { }

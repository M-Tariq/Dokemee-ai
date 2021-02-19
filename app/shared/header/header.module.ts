import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './containers';
import { NotificationsComponent, UserComponent } from './components';
import { SearchComponent } from './components/search/search.component';
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    HeaderComponent,
    UserComponent,
    SearchComponent,
    ProfileDialogComponent,
    SettingsDialogComponent,
    NotificationsComponent,
    ProfileDialogComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatDialogModule,
    MatCheckboxModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ]
})
export class HeaderModule { }

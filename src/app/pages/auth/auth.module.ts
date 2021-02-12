import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components';
import { AuthPageComponent } from './containers';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';

@NgModule({
  declarations: [
    AuthPageComponent,
    LoginFormComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ChangePasswordModalComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatIconModule
  ],
  providers: [
  ]
})
export class AuthModule { }

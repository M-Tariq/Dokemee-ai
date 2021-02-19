import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components';
import { AuthPageComponent } from './containers';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';

@NgModule({
  declarations: [
    AuthPageComponent,
    LoginFormComponent,
    ForgotPasswordComponent,
    ChangePasswordModalComponent
  ],
  
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
  ]
})
export class AuthModule { }

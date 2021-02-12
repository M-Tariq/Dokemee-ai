import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthPageComponent } from './containers';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { IsLoggedInGuard } from 'src/app/guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path: 'change-password',
    component:ChangePasswordComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}

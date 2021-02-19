import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ReportsPageComponent } from './containers';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ReportsPageComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ReportsRoutingModule {
}

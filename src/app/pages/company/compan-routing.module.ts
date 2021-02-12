import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CompanyPageComponent,ConnectionPageComponent,FormLibraryPageComponent} from './containers';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CompanyPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'connection',
    component: ConnectionPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'forml-ibrary',
    component: FormLibraryPageComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CompanyRoutingModule {
}

import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
   
    component: DashboardPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'reports',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
  },

  {
    path: 'admin-user',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  
  {
    path: 'company',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

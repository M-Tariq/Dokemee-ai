import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import {
  ManagerTableComponent,
  UserTableComponent
} from './components';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AdminPageComponent } from './containers';
import { CompanyService } from './services';


@NgModule({
  declarations: [
    AdminPageComponent,
    ManagerTableComponent,
    UserTableComponent,
    AddCompanyComponent,
    AddUserComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    CompanyService
  ]
})
export class AdminModule { }

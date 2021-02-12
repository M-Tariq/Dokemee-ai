import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { CompanyRoutingModule } from './compan-routing.module';
import {
  CompanyDetailDialog,
  ConnectionsFormComponent, ConnectionTableComponent, ManagerTableComponent,
  MappingTableComponent
} from './components';
import { CompanyPageComponent, ConnectionPageComponent, FormLibraryPageComponent } from './containers';
import { CompanyService } from './services';


@NgModule({
  declarations: [
    CompanyPageComponent,
    ManagerTableComponent,
    CompanyDetailDialog,
    ConnectionPageComponent,
    ConnectionTableComponent,
    FormLibraryPageComponent,
    MappingTableComponent,
    ConnectionsFormComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatGridListModule,
    MatFormFieldModule,
    MatListModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CompanyService
  ]
})
export class CompanyModule { }

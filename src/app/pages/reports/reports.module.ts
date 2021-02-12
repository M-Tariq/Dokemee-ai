import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { ReportsTableComponent } from './components';
import { ReportsDetailTableComponent } from './components/reports-detail-table/reports-detail-table.component';
import { ReportsPageComponent } from './containers';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsService } from './services';

@NgModule({
  declarations: [
    ReportsPageComponent,
    ReportsTableComponent,
    ReportsDetailTableComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [
    ReportsService
  ]
})
export class ReportsModule { }

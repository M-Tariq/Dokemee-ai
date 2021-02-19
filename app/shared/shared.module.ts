import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderModule } from './header/header.module';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    HeaderModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    HeaderModule,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,

  ]
})
export class SharedModule { }

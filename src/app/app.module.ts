import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { AuthModule } from './pages/auth/auth.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuardService } from './guards/auth-guard.service';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 5000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
  
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthGuardService, IsLoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private notificationService: NotificationService, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request)
      .pipe(tap(event => {
        if (event instanceof HttpResponse) {
          console.log(event.status);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // this.dialogRef.close();
            this.notificationService.showError("Error", "You are unauthorized!");
            console.log(err.status + err.message);
            this.authService.logoutUser();
            localStorage.clear();
            this.router.navigateByUrl("");
            // redirect to the login route
            // or show a modal
          }
        }
      })
      )
  }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public hide: boolean = true;
  public api_error: String;
  public isLoading: boolean = false;

  public form: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

  }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    const email = this.form.value.userName;
    const password = this.form.value.password;
    this.isLoading = true;
    this.authService.loginUser({ username: email, password: password }).subscribe(res => {
      this.isLoading = false;
      this.notificationService.showSuccess("You are successfully logged In.", "Success");
      const token = res.TokenDetails.Token;
      localStorage.setItem('token', token);
      this.router.navigateByUrl('/dashboard');

    }, error => {
      this.isLoading = false;
      this.notificationService.showError(error.error.Message, "Error");
      this.api_error = error.error.Message;
    });
  }
}

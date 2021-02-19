import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    let rememberedUser: string = this.authService.getRememberUser();
    console.log(rememberedUser);
    this.form = new FormGroup({
      userName: new FormControl(rememberedUser, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl('',)
    });
  }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    console.log("remember me:");
    console.log(this.form.value.rememberMe);

    const userName = this.form.value.userName;
    const password = this.form.value.password;
    this.isLoading = true;
    if (this.form.value.rememberMe) {
      this.authService.rememberUser(userName);
    }
    this.authService.loginUser({ username: userName, password: password }).subscribe(res => {
      this.isLoading = false;
      const token = res.TokenDetails.Token;
      this.authService.setAuthToken(res.TokenDetails.Token);
      console.log(res.UserInfo);
      this.authService.setCurrentUser(res.UserInfo);
      // localStorage.setItem('token', token);
      this.router.navigateByUrl('/dashboard');

    }, error => {
      this.isLoading = false;
      if (error.error.Message) {
        this.api_error = error.error.Message;
      } else {
        this.api_error = error.message;
      }
    });
  }
}

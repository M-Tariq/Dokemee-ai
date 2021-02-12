import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup;
  public error: string;
  public isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  public ngOnInit(): void {
    this.form = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

  }

  get formControl() {
    return this.form.controls;
  }
  onSubmit() {
    const oldPassword = this.form.value.oldPassword;
    const newPassword = this.form.value.newPassword;
    this.isLoading = true;

    this.authService.changePassword({ oldPassword: oldPassword, password: newPassword }).subscribe(res => {
    this.isLoading = false;
      this.router.navigateByUrl('/dashboard');
    }, error => {
    this.isLoading = false;

    })
  }
}


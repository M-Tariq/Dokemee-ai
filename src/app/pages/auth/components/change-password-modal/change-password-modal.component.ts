import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  public hide: boolean = true;
  public form: FormGroup;
  public error: string;
  public isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  public ngOnInit(): void {
    this.form = new FormGroup({
      oldPassword: new FormControl(null, [Validators.minLength(6)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

  }

  get formControl() {
    return this.form.controls;
  }
  onSubmit() {
    const oldPassword = this.form.value.oldPassword;
    const newPassword = this.form.value.newPassword;
    const confirmPassword=this.form.value.confirmPassword;
    this.isLoading = true;

    console.log(this.form);
    alert("On Save")
    this.authService.changePassword({ oldPassword: oldPassword, password: newPassword }).subscribe(res => {
      this.isLoading = false;
      this.router.navigateByUrl('/dashboard');
    }, error => {
      this.isLoading = false;
      this.error=error.error.Message;
      console.log(error);

    })
  }

}

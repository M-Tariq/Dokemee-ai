import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileDialogComponent } from 'src/app/shared/header/components';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  public hide: boolean = true;
  public form: FormGroup = new FormGroup({});
  public error: string;
  public isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, 
    public dialogRef: MatDialogRef<ProfileDialogComponent>) { }
  public ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: new FormControl(null, [Validators.minLength(6)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    }, 
    {
      validator: this.ConfirmPasswordValidator('newPassword', 'confirmPassword')
    });

  }

  get formControl() {
    return this.form.controls;
  }
  onSubmit() {
    const oldPassword = this.form.value.oldPassword;
    const newPassword = this.form.value.newPassword;
    const confirmPassword = this.form.value.confirmPassword;
    this.isLoading = true;
    if(newPassword!==confirmPassword){
      this.formControl.confirmPassword.setErrors(this.ConfirmPasswordValidator);
    }
    this.authService.changePassword({ oldPassword: oldPassword, password: newPassword }).subscribe(res => {
      this.isLoading = false;
      this.router.navigateByUrl('/dashboard');
      this.dialogRef.close();
    }, error => {
      this.isLoading = false;
      this.error = error.error.Message;
      alert(error.error.Message);
      console.log(error);
    })
  }

  ConfirmPasswordValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.confirmPasswordValidator) {
        return;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ confirmPasswordValidator: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

}

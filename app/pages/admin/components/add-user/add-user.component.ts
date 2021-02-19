import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/header/models/user.model';
import { Users } from '../../models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public api_error: string;
  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'userName': new FormControl('', []),
      'firstName': new FormControl('', [Validators.minLength(3)]),
      'lastName': new FormControl('', [Validators.minLength(3)]),
      'email': new FormControl('', [Validators.email]),
      'confirmEmail': new FormControl('', [Validators.email]),
    }, {
      validator: this.confirmEmailValidator('email', 'confirmEmail')
    });
  }


  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    const user: User = new User();
    user.UserName = this.form.value.userName;
    user.FirstName = this.form.value.firstName;
    user.LastName = this.form.value.lastName;
    user.Email = this.form.value.email;
    user.FirstName = this.form.value.firstName;

    if (user) {
      this.usersService.addUser(user).subscribe(res => {
        console.log(res);
        this.api_error = "";
      }, (error) => {
        this.api_error = error.error.Message;
        console.log(error.error.Message);
      })
    }
  }

  confirmEmailValidator(email: string, confirmEmail: string) {
    return (formGroup: FormGroup) => {
      const emailControl = formGroup.controls[email];
      const confirmEmailControl = formGroup.controls[confirmEmail];
      if (confirmEmailControl.errors && !confirmEmailControl.errors.confirmEmailValidator) {
        return;
      }
      if (emailControl.value !== confirmEmailControl.value) {
        confirmEmailControl.setErrors({ confirmEmailValidator: true });
      } else {
        confirmEmailControl.setErrors(null);
      }
    }
  }
}

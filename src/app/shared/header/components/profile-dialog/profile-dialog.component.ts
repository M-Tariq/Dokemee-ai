import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';
import { ChangePasswordModalComponent } from '../../../../pages/auth/components/change-password-modal/change-password-modal.component';


@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  public form: FormGroup=new FormGroup({});
  public user: User=new User();
  public error: boolean;
  public isLoading: boolean=false;
  constructor(public dialogRef: MatDialogRef<ProfileDialogComponent>, public dialog: MatDialog,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(res => {
      this.user = res;
    }, error => {
      console.log(error);
    })
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),

    })
  }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.updateUserProfile(this.form.value).subscribe(res => {
      this.isLoading = false;
      this.dialogRef.close();
    }, error=>{
      this.isLoading=false;
      this.error=error.error.Message;
      console.log(error);
    })
  }

  OpenChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      width: '399px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  public form: FormGroup=new FormGroup({});
  public user: User=new User();
  public isLoading: boolean=false;
  constructor(public dialogRef: MatDialogRef<ProfileDialogComponent>, public dialog: MatDialog,
    private authService: AuthService) { 
      
    }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(res=>{
      this.user=res;
    }, error=>{
      console.log(error);
    })
    this.form=new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),

    })
  }

  get formControl(){
    return this.form.controls;
  }

  onSubmit(){
    this.isLoading=true;
    this.authService.updateUserProfile(this.form.value).subscribe(res=>{
      this.isLoading=false;
      this.dialogRef.close();
    }, error=>{
      this.isLoading=false;
      console.log(error);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public isLoading: boolean = false;
  public error: string;
  public form: FormGroup;
  constructor(private authService: AuthService, private notificationService: NotificationService,){}
  public ngOnInit(): void { 
    this.form=new FormGroup({
      email: new FormControl(null, [Validators.email,Validators.required]),
    });
  }
  get formControl() {
    return this.form.controls;
  }
  onSubmit(){
    this.isLoading = true;
    const userEmail=this.form.value.email;
    this.authService.forgotPassword({Email: userEmail}).subscribe(res=>{
    this.isLoading = false;
    this.notificationService.showSuccess("Password reset link is sent to your email address!", "Success");
    }, error=>{
    this.isLoading = false;
      this.error=`${error.error.Message}`;
    this.notificationService.showError(this.error, "Error");
    })
  }

}

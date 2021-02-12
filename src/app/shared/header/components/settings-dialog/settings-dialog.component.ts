import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { SmtpSetting } from '../../models/setting-smtp.model';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  public hide: boolean = true;
  public smtpSetting: SmtpSetting;
  public error: string;
  public isLoading: boolean=false;
  public form: FormGroup = new FormGroup({});
  constructor(private notificationService: NotificationService,
    public dialogRef: MatDialogRef<SettingsDialogComponent>, public dialog: MatDialog,
    private settingsService: SettingsService) {

  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  ngOnInit(): void {
    this.settingsService.getSmtpSettings().subscribe(res => {
      console.log(res);
      this.smtpSetting = res.Configuration;
    }, error => {
      console.log(error);
    })
    this.form = new FormGroup({
      mailServer: new FormControl(null, [Validators.required]),
      host: new FormControl(null, [Validators.required]),
      port: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  get formControl() {
    return this.form.controls;
  }
  onSubmit() {
    this.smtpSetting.Server = this.form.value.mailServer;
    this.smtpSetting.Host = this.form.value.host;
    this.smtpSetting.Port = this.form.value.port;
    this.smtpSetting.Email = this.form.value.email;
    this.smtpSetting.Password = this.form.value.password;
    this.isLoading=true;
    this.settingsService.updateSmtpSettings(this.smtpSetting).subscribe(res => {
      this.isLoading=true;
      this.notificationService.showSuccess("Settings Updated Successfully!", "Success");
      this.dialogRef.close();
    }, error => {
      this.isLoading=true;
      this.error = error.Message;
      this.notificationService.showError(this.error, "Error");
    })
  }
}

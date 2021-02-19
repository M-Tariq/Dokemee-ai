import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { SettingsService } from 'src/app/services/settings.service';
import { SmtpSetting } from '../../models/setting-smtp.model';
interface MailServer {
  name: string;
}

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})


export class SettingsDialogComponent implements OnInit {

  public hide: boolean = true;
  public isOtherServerSelected: boolean = false;
  public mailServer: string;
  public port: number;
  public host: string;
  public smtpSetting: SmtpSetting = new SmtpSetting();
  public error: string;
  public isLoading: boolean = false;
  public mailServers: MailServer[] = [
    { name: "Google" },
    { name: "Yahoo" },
    { name: "Office365" },
    { name: "Other" }
  ];

  public form: FormGroup = new FormGroup({});

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>, public dialog: MatDialog,
    private settingsService: SettingsService) {

  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  ngOnInit(): void {
    this.settingsService.getSmtpSettings().subscribe(res => {
      this.smtpSetting = res.Configuration;
      console.log(this.smtpSetting);
    }, error => {
    })
    this.form = new FormGroup({
      server: new FormControl(this.smtpSetting.Server, [Validators.required]),
      host: new FormControl(this.smtpSetting.Host, [Validators.required]),
      port: new FormControl(this.smtpSetting.Port, [Validators.required]),
      email: new FormControl(this.smtpSetting.Email, [Validators.required, Validators.email]),
      password: new FormControl(this.smtpSetting.Password, [Validators.required, Validators.minLength(6)]),
      enableSsl: new FormControl(this.smtpSetting.EnableSsl)
    });
  }

  get formControl() {
    return this.form.controls;
  }
  onSubmit() {
    this.smtpSetting.Server = this.mailServer;
    this.smtpSetting.Host = this.host;
    this.smtpSetting.Port = this.form.value.port;
    this.smtpSetting.Email = this.form.value.email;
    this.smtpSetting.Password = this.form.value.password;
    this.smtpSetting.EnableSsl = this.form.value.enableSsl;


    console.log(this.smtpSetting);
    // this.isLoading = true;
    // this.settingsService.updateSmtpSettings(this.smtpSetting).subscribe(res => {
    //   this.isLoading = false;
    //   this.dialogRef.close();
    // }, error => {
    //   this.isLoading = false;
    //   this.error = error.error.Message;
    //   console.log(error);
    // })
  }

  onChangeServer(matSelectChange: MatSelectChange) {
    console.log(matSelectChange);
    this.smtpSetting.Server = matSelectChange.value;
    if (matSelectChange.value === "Other") {
      this.isOtherServerSelected = true;
    } else {
      this.isOtherServerSelected = false;
    }
    switch (matSelectChange.value) {
      case "Google":
        this.mailServer="Google";
        this.port = 587;
        this.host = 'smtp.gmail.com';
        break;
      case "Outlook":
        this.mailServer="Outlook";
        this.port = 587;
        this.host = 'smtp-mail.outlook.com';
        break;
      case "Yahoo":
        this.mailServer="Yahoo";
        this.port = 587;
        this.host = 'smtp.mail.yahoo.com';
        break;
      case "Office365":
        this.mailServer="Office365";
        this.port = 587;
        this.host = 'smtp.office365.com';
        break;
      case "Other":
        this.mailServer="Other";
        this.port = null;
        this.host = '';
        break;
    }
    console.log(this.isOtherServerSelected);
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { routes } from '../../../../consts';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public routes: typeof routes = routes;
  public flatlogicEmail: string = "https://flatlogic.com1";

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) { }

  OpenProfileDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent,{
      width: '399px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  OpenSettingsDialog(): void{
    const dialogRef = this.dialog.open(SettingsDialogComponent,{
      width: '399px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSignOut(){
    this.authService.logoutUser();
    this.authService.logoutRedirect();
  }
}

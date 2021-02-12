import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../components/shared/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: "root",
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) { }

  public async getConfirmation(title: string, message: string) {
    // create and show confirmation dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });

    // get dialog result, yes or no value
    const dialogResult = await dialogRef.afterClosed().toPromise();

    // return if ok or cancel is selected
    return dialogResult ? true : false;
  }
}

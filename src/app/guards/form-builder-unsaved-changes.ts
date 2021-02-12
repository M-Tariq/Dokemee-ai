import { Injectable, ɵbypassSanitizationTrustUrl } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CanDeactivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscriber } from 'rxjs';
import { FormBuilderComponent } from '../components/form-builder/form-builder.component';
import { AuthService } from '../services/auth.service';
import { LocalizationService } from '../services/localization.service';

@Injectable()
export class FormBuilderUnsavedChanges implements CanDeactivate<FormBuilderComponent> {

  constructor(
    private authService: AuthService,
    private localizationService: LocalizationService,
    private translateService: TranslateService,
    private dialog: MatDialog,
  ) { }

  canDeactivate(component: FormBuilderComponent): boolean | Observable<boolean> {

    if(this.authService.forceLogout) {

      this.authService.forceLogout = false;

      return true;
    }

    // get boolean that checks if we can deactivate the component
    const canDeactivate: boolean = component.canDeactivate();

    const loggingOutFromBuilder = this.authService.loggingOutFromBuilder;
    this.authService.loggingOutFromBuilder = false;

    if (loggingOutFromBuilder) {
      if (canDeactivate) {
        return this.complete();
      }
      else {
        if (confirm(this.translateService.instant('BUILDER.UNSAVED_CHANGES'))) return this.complete();
        return false;
      }
    }
    else {
      if (!canDeactivate) {
        return confirm(this.translateService.instant('BUILDER.UNSAVED_CHANGES'));
      }

      return true;
    }
  }

  private complete() {
    return new Observable<boolean>((observer: Subscriber<boolean>) => {
      this.authService.logoutUser().subscribe(() => {

        this.localizationService.use('en');

        // close all open dialogs
        this.dialog.closeAll();

        // clear local storage
        localStorage.clear();

        // complete observable/subscriber
        observer.next(true);
        observer.complete();
      });
    });
  }
}

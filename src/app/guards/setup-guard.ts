import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscriber } from 'rxjs';
import { SetupWizardService } from '../services/setup-wizard.service';

@Injectable()
export class SetupGuard implements CanActivate {

  constructor(
    private wizardService: SetupWizardService,
    private spinner: NgxSpinnerService,
    public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {

    if (route.data.isSetupWizard) {

      // show loading spinner
      this.spinner.show();

      return new Observable<boolean>((observer: Subscriber<boolean>) => {

        // get wizard data and status
        this.wizardService.getWizardStatus().subscribe((response: any) => {

          this.updateWizardStatus(response);

          // if setup wizard is required
          if (this.wizardService.isSetupRequired) {
            // remove login token
            localStorage.removeItem('jwt');
          }
          else {
            // hide loading spinner
            this.spinner.hide();

            this.router.navigate(['login']);
          }

          // complete observable
          observer.next(this.wizardService.isSetupRequired);
          observer.complete();
        });
      });
    }
    else {
      // show loading spinner
      this.spinner.show();

      return new Observable<boolean>((observer: Subscriber<boolean>) => {

        // get wizard data and status
        this.wizardService.getWizardStatus().subscribe((response) => {

          this.updateWizardStatus(response);

          // complete observable
          observer.next(!this.wizardService.isSetupRequired);
          observer.complete();

          // hide loading spinner
          this.spinner.hide();

          // if setup wizard is required
          if (this.wizardService.isSetupRequired) {

            // remove login token
            localStorage.removeItem('jwt');

            // redirect to setup wizard component
            this.router.navigate(["setup"]);
          }
        });
      });
    }
  }

  private updateWizardStatus(response: any): void {
    // if setup is complete
    if (response.IsSetupCompleted) {

      // setup wizard is not required
      this.wizardService.isSetupRequired = false;
    }
    else {
      // setup wizard is required
      this.wizardService.isSetupRequired = true;
    }
  }
}

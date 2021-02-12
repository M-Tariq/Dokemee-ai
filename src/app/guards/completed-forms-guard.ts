import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { FormBuilderService } from '../services/form-builder.service';
import { FormLibraryService } from '../services/form-library.service';

@Injectable()
export class CompletedFormsGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private formsService: FormBuilderService,
    private formLibraryService: FormLibraryService,
    private spinner: NgxSpinnerService,
    public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {

    // if user is super admin return true
    if (this.authService.isSuperAdmin()) {
      return true;
    }

    // show loading spinner
    this.spinner.show();

    // get parameters from URL
    const params = route.params;

    // inside folder
    if (route.queryParams.folder === 'true') {

      // return observable because of async API call
      return new Observable<boolean>((observer: Subscriber<boolean>) => {
        this.formLibraryService.getCabinetFolderWithPermissionsById(params.cabFolderId).subscribe((response) => {

          // check if allowed to view completed forms
          const allowed: boolean = this.authService.hasFolderPermission(response.PermissionIds, 'ViewCompletedDataSimpleForm');
          this.completeAndredirect(observer, allowed);
        })
      });
    }
    else {
      // return observable because of async API call
      return new Observable<boolean>((observer: Subscriber<boolean>) => {
        this.formsService.getCabinetWithPermissions(params.cabFolderId).subscribe((response) => {

          // check if allowed to view completed forms
          const allowed: boolean = this.authService.hasCabinetPermission(response.PermissionIds, 'ViewCompletedDataSimpleForm');
          this.completeAndredirect(observer, allowed);
        })
      });
    }
  }

  private completeAndredirect(observer: Subscriber<boolean>, allowed: boolean): void {
    // complete observable/subscriber
    observer.next(allowed);
    observer.complete();

    if (!allowed) {
      // hide loading spinner
      this.spinner.hide();

      // redirect to unauthorized component
      this.router.navigate(["unauthorized"]);
    }
  }
}

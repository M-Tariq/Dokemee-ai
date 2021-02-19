import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { FormBuilderService } from '../services/form-builder.service';
import { FormLibraryService } from '../services/form-library.service';

@Injectable()
export class FormLibraryGuard implements CanActivate {

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
    if (params.folderId) {

      // return observable because of async API call
      return new Observable<boolean>((observer: Subscriber<boolean>) => {
        this.formLibraryService.getCabinetFolderWithPermissionsById(params.folderId).subscribe((response) => {

          // check if allowed to view simple forms
          const allowed: boolean = this.authService.hasFolderPermission(response.PermissionIds, 'ViewSimpleForm');
          this.completeAndredirect(observer, allowed);
        })
      });
    }
    // inside templates folder
    else if (params.templateFolderId) {

      // return observable because of async API call
      return new Observable<boolean>((observer: Subscriber<boolean>) => {
        this.formsService.getCabinetWithPermissions(params.cabinetId).subscribe((response) => {

          // check if allowed to view simple form templates
          const allowed: boolean = this.authService.hasCabinetPermission(response.PermissionIds, 'ViewSimpleFormTemplate');
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

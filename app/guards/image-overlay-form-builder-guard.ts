import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { FormBuilderService } from '../services/form-builder.service';
import { FormLibraryService } from '../services/form-library.service';

@Injectable()
export class ImageOverlayFormBuilderGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private formsService: FormBuilderService,
    private formLibraryService: FormLibraryService,
    private spinner: NgxSpinnerService,
    public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {

    if (!this.authService.isAuthenticated()) {
      return false;
    }

    // if user is super admin return true
    if (this.authService.isSuperAdmin()) {
      return true;
    }

    // show loading spinner
    this.spinner.show();

    // get parameters from URL
    const params = route.params;
    const queryparams = route.queryParams;

    let permissionkey: string;

    // if mode is available
    if (params.mode && params.mode === 'edit-image-overlay-form') {
      permissionkey = 'EditImageOverlayForm';
    }
    if (params.mode && params.mode === 'form-from-template') {
      permissionkey = 'AddImageOverlayForm';
    }
    if (params.mode && params.mode === 'edit-image-overlay-form-template') {
      permissionkey = 'EditImageOverlayFormTemplate';
    }

    // return observable because of async API call
    return new Observable<boolean>((observer: Subscriber<boolean>) => {
      if (permissionkey === 'EditImageOverlayForm') {
        if (queryparams.folder === 'true') {

          // get folder with permissions from API
          this.formLibraryService.getCabinetFolderWithPermissionsById(params.cabinetId).subscribe((response) => {

            // if allowed to edit forms
            const allowed: boolean = this.authService.hasFolderPermission(response.PermissionIds, 'EditImageOverlayForm');

            // complete observable
            observer.next(allowed);
            observer.complete();

            // hide loading spinner
            this.spinner.hide();

            if (!allowed) {
              // redirect to unauthorized component
              this.router.navigate(["unauthorized"]);
            }
          });
        }
        else {
          this.getCabinetWithPermissions(params.cabinetId, permissionkey, observer);
        }
      }
      else if (permissionkey === 'AddImageOverlayForm') {

        // get all cabinets from API
        this.formsService.getCabinetsWithPermissions().subscribe((response) => {
          const cabinets: any[] = response;

          // check if user has permission to add form in any of the cabinet
          const allowed: boolean = cabinets.some((cabinet: any) => {
            return this.authService.hasCabinetPermission(cabinet.PermissionIds, 'AddImageOverlayForm');
          });

          // complete observable
          observer.next(allowed);
          observer.complete();

          // hide loading spinner
          this.spinner.hide();

          if (!allowed) {
            // redirect to unauthorized component
            this.router.navigate(["unauthorized"]);
          }
        });
      }
      else if (permissionkey === 'EditImageOverlayFormTemplate') {
        // get all cabinets from API
        this.formsService.getCabinetsWithPermissions().subscribe((response) => {
          const cabinets: any[] = response;

          // check if user has permission to add form in any of the cabinet
          const allowed: boolean = cabinets.some((cabinet: any) => {
            return this.authService.hasCabinetPermission(cabinet.PermissionIds, 'EditImageOverlayFormTemplate');
          });

          // complete observable
          observer.next(allowed);
          observer.complete();

          // hide loading spinner
          this.spinner.hide();

          if (!allowed) {
            // redirect to unauthorized component
            this.router.navigate(["unauthorized"]);
          }
        });
      }
    });
  }

  private getCabinetWithPermissions(cabinetId: string, permissionkey: string, observer: Subscriber<boolean>) {
    // get cabiet with permissions from API
    this.formsService.getCabinetWithPermissions(cabinetId).subscribe((response) => {

      // if allowed to edit form template
      const allowed: boolean = this.authService.hasCabinetPermission(response.PermissionIds, permissionkey);

      // complete observable
      observer.next(allowed);
      observer.complete();

      // hide loading spinner
      this.spinner.hide();

      if (!allowed) {
        // redirect to unauthorized component
        this.router.navigate(["unauthorized"]);
      }
    });
  }
}

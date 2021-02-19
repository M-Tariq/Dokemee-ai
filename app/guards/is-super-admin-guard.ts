import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class IsSuperAdminGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): boolean {

    // if user is not super admin
    if (!this.authService.isSuperAdmin()) {

      // redirect to unauthorized component
      this.router.navigate(["unauthorized"]);

      return false;
    }

    return true;
  }
}

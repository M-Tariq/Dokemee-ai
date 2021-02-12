import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class IsAdminOrManagerGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): boolean {

    // if user is not cabinet manager and not admin
    if (!this.authService.isAdminOrManager()) {

      // redirect to unauthorized component
      this.router.navigate(["unauthorized"]);

      return false;
    }

    return true;
  }
}

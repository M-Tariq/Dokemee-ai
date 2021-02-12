import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class IsLoggedInGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    
    // if user is not logged in
    if (this.auth.isAuthenticated()) {
      // redirect to login component
      this.router.navigate(["dashboard"]);

      return false;
    }

    return true;
  }
}

import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    
    // if user is not logged in
    if (!this.auth.isAuthenticated()) {
      // redirect to login component
      this.router.navigate(["login"]);

      return false;
    }

    return true;
  }
}

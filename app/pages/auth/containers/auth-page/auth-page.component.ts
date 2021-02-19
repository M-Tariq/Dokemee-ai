import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public routers: typeof routes = routes;

  constructor(
    private router: Router
  ) { }

  public sendLoginForm(): void {
    this.router.navigate([this.routers.DASHBOARD]).then();
  }
}

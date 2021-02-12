import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../../consts/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public routes: typeof routes = routes;

  constructor(private router: Router) {
  }

  public signOut(): void {
    this.router.navigate([this.routes.LOGIN]);
  }
}

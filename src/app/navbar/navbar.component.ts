import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,
    RouterLinkActive,
  RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected keycloakService = inject(KeycloakService);

  protected async login() {
    await this.keycloakService.login()
  }

  protected async logout() {
    await this.keycloakService.logout()
  }
}

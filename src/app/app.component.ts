import { APP_INITIALIZER, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FocusDetailsDirective } from './focus-details.directive';
import { HighlightMeDirective } from './highlight-me.directive';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HighlightMeDirective,
    FocusDetailsDirective,
    ReactiveFormsModule,
    NavbarComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'training';
  protected keycloakService = inject(KeycloakService);
  protected authenticated = false;
  protected user = '';

  constructor() {
  this.authenticated = this.keycloakService.isLoggedIn();
    if (this.authenticated) {
      this.user = this.keycloakService.getUsername();
      this.keycloakService.getToken().then((token) => {
        console.log(token)
      })
    }
  }
}

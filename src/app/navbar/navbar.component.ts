import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

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
  protected authService = inject(AuthService);

  protected login = () => {
    console.log('true');
    this.authService.login()
  }

  protected logout = () => {
    console.log('false');
    this.authService.logout()
  }
}

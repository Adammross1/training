import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FocusDetailsDirective } from './focus-details.directive';
import { HighlightMeDirective } from './highlight-me.directive';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
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
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'training';
  
}

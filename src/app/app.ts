import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  enInicio = false;

  constructor(private router: Router) {
    // Si recarga la página estando en /inicio, no muestra el video
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.enInicio = event.url !== '/' && event.url !== '';
      }
    });
  }

  entrar() {
    this.enInicio = true;
    this.router.navigate(['/inicio']);
  }

  irLogin() {
    this.enInicio = true;
    this.router.navigate(['/login']);
  }
}
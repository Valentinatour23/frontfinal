import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  irA(seccion: string): void {
    const elemento = document.getElementById(seccion);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }

  irTurismo(): void {
    window.open(
      'https://www.turismoentrerios.com/sanjose/',
      '_blank'
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit {

  alojamientos: any[] = [];
  mostrarContenido = false;
  resenaActual = 0;

  resenas = [
    {
      inicial: 'L',
      nombre: 'Lorena Chaires',
      meta: '7 reseñas · 6 fotos',
      tiempo: 'Hace un año',
      texto: 'Excelente lugar, tranquilo, cerca de todo, con un parque y pileta hermosos! Especial para disfrutar! La atención de sus dueños, inmejorable!'
    },
    {
      inicial: 'O',
      nombre: 'Oscar Carruego',
      meta: 'Local guide · 59 reseñas',
      tiempo: 'Hace 8 años',
      texto: 'Muy bien, lindo lugar.'
    },
    {
      inicial: 'M',
      nombre: 'Maria Gomez',
      meta: 'Local guide · 10 reseñas',
      tiempo: 'Hace 3 años',
      texto: 'Un lugar soñado. Perfecto para relajarse y disfrutar en pareja o en familia. Seguro volvemos pronto.'
    }
  ];

  constructor(private alojamientoService: AlojamientoService) {}

  ngOnInit(): void {
    this.alojamientoService.alojamientos().subscribe({
      next: (data) => { this.alojamientos = data; },
      error: (err) => { console.error('Error:', err); }
    });
  }

  saberMas(): void {
    this.mostrarContenido = true;
    setTimeout(() => {
      const seccion = document.getElementById('seccion-cabanas');
      if (seccion) seccion.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  siguienteResena(): void {
    this.resenaActual = (this.resenaActual + 1) % this.resenas.length;
  }

  anteriorResena(): void {
    this.resenaActual = (this.resenaActual - 1 + this.resenas.length) % this.resenas.length;
  }
}
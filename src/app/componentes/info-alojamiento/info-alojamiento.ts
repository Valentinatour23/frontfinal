import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-info-alojamiento',
  standalone: true,
  imports: [CommonModule, NavbarComponent], 
  templateUrl: './info-alojamiento.html',
  styleUrl: './info-alojamiento.css'
})
export class InfoAlojamientoComponent {}
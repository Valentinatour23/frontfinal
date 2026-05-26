import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css'
})
export class Reserva implements OnInit {

  diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  mesesNombres = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  mesActual: number;
  anioActual: number;
  diasDelMes: number[] = [];
  vacios: number[] = [];
  fechasOcupadas: string[] = [];

  fechaEntrada: Date | null = null;
  fechaSalida: Date | null = null;
  bungalowSeleccionado: number = 1;

  cargando = false;
  errorMsg = '';

  constructor(private reservaService: ReservaService) {
    const hoy = new Date();
    this.mesActual = hoy.getMonth();
    this.anioActual = hoy.getFullYear();
  }

  ngOnInit(): void {
    this.generarCalendario();
    this.cargarDisponibilidad();
  }

  get nombreMes(): string {
    return this.mesesNombres[this.mesActual];
  }

  get cantidadNoches(): number {
    if (!this.fechaEntrada || !this.fechaSalida) return 0;
    const diff = this.fechaSalida.getTime() - this.fechaEntrada.getTime();
    return Math.round(diff / (1000 * 60 * 60 * 24));
  }

  seleccionarBungalow(n: number): void {
    this.bungalowSeleccionado = n;
    this.limpiarSeleccion();
    this.cargarDisponibilidad();
  }

  generarCalendario(): void {
    const primerDia = new Date(this.anioActual, this.mesActual, 1).getDay();
    const ultimoDia = new Date(this.anioActual, this.mesActual + 1, 0).getDate();
    this.vacios = Array(primerDia).fill(0);
    this.diasDelMes = Array.from({ length: ultimoDia }, (_, i) => i + 1);
  }

  cargarDisponibilidad(): void {
    this.cargando = true;
    this.errorMsg = '';
    this.reservaService.getDisponibilidad(this.bungalowSeleccionado).subscribe({
      next: (fechas) => {
        this.fechasOcupadas = fechas;
        this.cargando = false;
      },
      error: () => {
        this.errorMsg = 'No se pudo cargar la disponibilidad.';
        this.cargando = false;
      }
    });
  }

  mesAnterior(): void {
    if (this.mesActual === 0) { this.mesActual = 11; this.anioActual--; }
    else this.mesActual--;
    this.generarCalendario();
  }

  mesSiguiente(): void {
    if (this.mesActual === 11) { this.mesActual = 0; this.anioActual++; }
    else this.mesActual++;
    this.generarCalendario();
  }

  seleccionarDia(dia: number): void {
    const fecha = new Date(this.anioActual, this.mesActual, dia);
    if (this.esPasado(dia) || this.estaOcupado(dia)) return;

    if (!this.fechaEntrada || (this.fechaEntrada && this.fechaSalida)) {
      this.fechaEntrada = fecha;
      this.fechaSalida = null;
    } else {
      if (fecha <= this.fechaEntrada) {
        this.fechaEntrada = fecha;
        return;
      }
      const hayOcupadas = this.fechasOcupadas.some(f => {
        const d = new Date(f);
        return d > this.fechaEntrada! && d < fecha;
      });
      if (hayOcupadas) {
        this.errorMsg = 'Hay fechas ocupadas en ese rango. Elegí otro período.';
        return;
      }
      this.errorMsg = '';
      this.fechaSalida = fecha;
    }
  }

  estaOcupado(dia: number): boolean {
    const fecha = this.formatearFecha(new Date(this.anioActual, this.mesActual, dia));
    return this.fechasOcupadas.includes(fecha);
  }

  estaSeleccionado(dia: number): boolean {
    const fecha = new Date(this.anioActual, this.mesActual, dia);
    return (!!this.fechaEntrada && fecha.toDateString() === this.fechaEntrada.toDateString()) ||
           (!!this.fechaSalida && fecha.toDateString() === this.fechaSalida.toDateString());
  }

  estaEnRango(dia: number): boolean {
    if (!this.fechaEntrada || !this.fechaSalida) return false;
    const fecha = new Date(this.anioActual, this.mesActual, dia);
    return fecha > this.fechaEntrada && fecha < this.fechaSalida;
  }

  esPasado(dia: number): boolean {
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    return new Date(this.anioActual, this.mesActual, dia) < hoy;
  }

  formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }

  limpiarSeleccion(): void {
    this.fechaEntrada = null;
    this.fechaSalida = null;
    this.errorMsg = '';
  }

  confirmarReserva(): void {
    const entrada = this.fechaEntrada!.toLocaleDateString('es-AR');
    const salida = this.fechaSalida!.toLocaleDateString('es-AR');
    const msg = `Hola! Quiero consultar disponibilidad para Bungalow ${this.bungalowSeleccionado} del ${entrada} al ${salida}.`;
    const url = `https://wa.me/549TUNUMERO?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
}
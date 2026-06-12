import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilterReservas',
  standalone: true
})
export class FilterReservasPipe implements PipeTransform {

  transform(
    reservas: any[],
    textoBusqueda: string = '',          // <-- Ahora tiene valor por defecto
    cabanaSeleccionada: string = 'todas', // <-- Ahora tiene valor por defecto
    fechaDesde: string = '',             // <-- Ahora tiene valor por defecto
    fechaHasta: string = ''              // <-- Ahora tiene valor por defecto
  ): any[] {
    if (!reservas) return [];

    return reservas.filter(reserva => {
      // 1. Filtrar por Texto de Búsqueda
      if (textoBusqueda && textoBusqueda.trim() !== '') {
        const busqueda = textoBusqueda.toLowerCase();
        const nombreCliente = (reserva.usuario?.usuario || '').toLowerCase();
        if (!nombreCliente.includes(busqueda)) return false;
      }

      // 2. Filtrar por Cabaña Seleccionada
      if (cabanaSeleccionada && cabanaSeleccionada !== 'todas') {
        const nombreCabana = (reserva.alojamiento?.nombre_alojamiento || '').toLowerCase();
        if (!nombreCabana.includes(cabanaSeleccionada.toLowerCase())) return false;
      }

      // 3. Filtrar por Rango de Fechas
      if (reserva.fecha_inicio) {
        const fechaReservaStr = reserva.fecha_inicio.split('T')[0]; 

        if (fechaDesde && fechaReservaStr < fechaDesde) return false;
        if (fechaHasta && fechaReservaStr > fechaHasta) return false;
      } else if (fechaDesde || fechaHasta) {
        return false;
      }

      return true;
    });
  }
}
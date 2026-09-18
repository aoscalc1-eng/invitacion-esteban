import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  invitacionAbierta = false;

  dias = 0;
  horas = 0;
  minutos = 0;
  segundos = 0;

  private intervalo?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    // Recupera el estado si la persona salió a Maps
    this.invitacionAbierta =
      sessionStorage.getItem('invitacionAbierta') === 'true';

    this.actualizarContador();

    this.intervalo = setInterval(() => {
      this.actualizarContador();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  abrirInvitacion(): void {
    this.invitacionAbierta = true;

    sessionStorage.setItem(
      'invitacionAbierta',
      'true'
    );

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }

  volver(): void {
    this.invitacionAbierta = false;

    sessionStorage.removeItem(
      'invitacionAbierta'
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  abrirUbicacion(): void {
    // Conservamos abierta la invitación
    sessionStorage.setItem(
      'invitacionAbierta',
      'true'
    );

    const ubicacion =
      'Instituto de Diversificado por Cooperativa San Luis Guatemala';

    const url =
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(ubicacion);

    window.open(url, '_blank');
  }

  agregarCalendario(): void {
    const titulo =
      encodeURIComponent('Baby Shower de Esteban');

    const detalles =
      encodeURIComponent(
        'Acompáñanos a celebrar el Baby Shower de Esteban 💙'
      );

    const lugar =
      encodeURIComponent(
        'Instituto de Diversificado por Cooperativa San Luis'
      );

    /*
      Evento:
      20 de septiembre de 2026
      3:00 PM Guatemala

      Guatemala = UTC-6
      3:00 PM = 21:00 UTC
    */

    const fechas =
      '20260920T210000Z/20260921T000000Z';

    const url =
      'https://calendar.google.com/calendar/render' +
      '?action=TEMPLATE' +
      '&text=' + titulo +
      '&dates=' + fechas +
      '&details=' + detalles +
      '&location=' + lugar;

    window.open(url, '_blank');
  }

  async compartir(): Promise<void> {
    const url =
      'https://invitacion-esteban.vercel.app/';

    const datos = {
      title: 'Baby Shower de Esteban',
      text:
        '💙 Te invitamos a celebrar el Baby Shower de Esteban 🐘',
      url: url
    };

    if (navigator.share) {
      try {
        await navigator.share(datos);
      } catch {
        // Se cerró el menú de compartir.
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);

        alert(
          '💙 Enlace copiado. ¡Ya puedes compartirlo!'
        );
      } catch {
        alert(
          'Puedes compartir este enlace: ' + url
        );
      }
    }
  }

  actualizarContador(): void {
    // 20 de septiembre de 2026 a las 3:00 PM
    // Hora de Guatemala
    const evento =
      new Date('2026-09-20T15:00:00-06:00');

    const ahora = new Date();

    const diferencia =
      evento.getTime() - ahora.getTime();

    if (diferencia <= 0) {
      this.dias = 0;
      this.horas = 0;
      this.minutos = 0;
      this.segundos = 0;
      return;
    }

    this.dias = Math.floor(
      diferencia /
      (1000 * 60 * 60 * 24)
    );

    this.horas = Math.floor(
      (
        diferencia /
        (1000 * 60 * 60)
      ) % 24
    );

    this.minutos = Math.floor(
      (
        diferencia /
        (1000 * 60)
      ) % 60
    );

    this.segundos = Math.floor(
      (
        diferencia / 1000
      ) % 60
    );
  }

  @HostListener('window:focus')
  cuandoRegresa(): void {
    /*
      Cuando la persona regresa desde Maps
      o Calendar, conservamos la invitación
      abierta y actualizamos el contador.
    */

    if (
      sessionStorage.getItem(
        'invitacionAbierta'
      ) === 'true'
    ) {
      this.invitacionAbierta = true;
    }

    this.actualizarContador();
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  invitacionAbierta = false;

  abrirInvitacion(): void {
    this.invitacionAbierta = true;
  }

  volver(): void {
    this.invitacionAbierta = false;
  }

  abrirUbicacion(): void {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Escuela+de+San+Luis+Letran+Guatemala',
      '_blank'
    );
  }
}

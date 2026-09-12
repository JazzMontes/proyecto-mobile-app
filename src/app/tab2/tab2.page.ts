import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonContent
  ],
})
export class Tab2Page implements OnInit {

  nombre: string = 'Nombre';
  usuario: string = 'usuario';
  correo: string = 'ejemplo@correo.com';
  estado: string = 'Activo';

  inicial: string = 'J';

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {

    const nombreGuardado = localStorage.getItem('nombre');
    const usuarioGuardado = localStorage.getItem('usuario');
    const correoGuardado = localStorage.getItem('correo');
    const estadoGuardado = localStorage.getItem('estado');

    if (nombreGuardado) {
      this.nombre = nombreGuardado;
    }

    if (usuarioGuardado) {
      this.usuario = usuarioGuardado;
    }

    if (correoGuardado) {
      this.correo = correoGuardado;
    }

    if (estadoGuardado) {
      this.estado = estadoGuardado;
    }

    if (this.nombre.length > 0) {
      this.inicial = this.nombre.charAt(0).toUpperCase();
    }
  }

  cerrarSesion() {

    localStorage.removeItem('nombre');
    localStorage.removeItem('usuario');
    localStorage.removeItem('correo');
    localStorage.removeItem('estado');

    this.router.navigateByUrl('/login');
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Axios permite realizar peticiones HTTP hacia la API
import axios from 'axios';

import { addIcons } from 'ionicons';
import {
  locationOutline,
  callOutline,
  mailOutline
} from 'ionicons/icons';

// Estructura que esperamos recibir como respuesta de la API
interface LoginResponse {
  success: boolean;
  message: string;
  // user es opcional porque si el login falla puede no regresar sus datos
  user?: {
    id: number;
    username: string;
    email: string;
    name: string;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonContent,
    FormsModule,
    CommonModule
  ],
})
export class LoginPage {
  // Datos que se reciben desde el formulario
  username = '';
  password = '';

  usernameFocused = false;
  passwordFocused = false;

  // Estados booleanos utilizados principalmente para controlar la animación
  isLoginAnimating = false;
  isLoginMoving = false;
  authenticating = false;
  authReturning = false;
  hideLoginContent = false;
  loginSuccess = false;

  errorMessage = '';

  // Endpoint de la API encargado del inicio de sesión
  private readonly apiUrl = 'http://localhost/API_9B/login.php';

  constructor(private router: Router) {
    addIcons({
      'location-outline': locationOutline,
      'call-outline': callOutline,
      'mail-outline': mailOutline
    });
  }

  async login(): Promise<void> {
    // Evita ejecutar nuevamente el login mientras ya se está procesando
    if (this.isLoginAnimating || this.authenticating) {
      return;
    }

    this.errorMessage = '';

    // Valida que los campos tengan información antes de llamar a la API
    if (!this.username.trim() || !this.password) {
      this.errorMessage = 'Ingresa tu usuario y contraseña.';
      return;
    }

    this.startAuthenticationAnimation();

    try {
      // Envía las credenciales a login.php mediante una petición HTTP POST
      const response = await axios.post<LoginResponse>(
        this.apiUrl,
        {
          username: this.username.trim(),
          password: this.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Comprueba la respuesta que regresó la API
      if (!response.data.success || !response.data.user) {
        throw new Error(
          response.data.message || 'No fue posible iniciar sesión.'
        );
      }

      // Guarda los datos del usuario como texto en localStorage
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      this.finishAuthenticationAnimation(true);

    } catch (error: any) {
      // Manejo de errores de la API o de conexión
      const apiMessage = error?.response?.data?.message;

      this.errorMessage =
        apiMessage ||
        error?.message ||
        'Error al conectar con el servidor.';

      this.finishAuthenticationAnimation(false);
    }
  }

  // Controla el inicio de la animación de autenticación
  private startAuthenticationAnimation(): void {
    this.isLoginAnimating = true;

    setTimeout(() => {
      this.isLoginMoving = true;
    }, 300);

    setTimeout(() => {
      this.authenticating = true;
    }, 500);
  }

  // Termina la animación según si el login fue exitoso o no
  private finishAuthenticationAnimation(success: boolean): void {
    setTimeout(() => {
      this.authReturning = true;
      this.authenticating = false;
      this.isLoginMoving = false;
    }, 500);

    setTimeout(() => {
      this.isLoginAnimating = false;
      this.authReturning = false;

      if (success) {
        this.hideLoginContent = true;
        this.loginSuccess = true;
      }
    }, 800);

    // Si fue exitoso, Router navega hacia Tab 1
    if (success) {
      setTimeout(() => {
        this.router.navigateByUrl('/tabs/tab1', {
          replaceUrl: true
        });
      }, 1500);
    }
  }
}

import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost/API_9B/users.php';

  // GET - Obtener usuarios
  getUsers() {
    return axios.get<User[]>(this.apiUrl);
  }

  // POST - Crear usuario
  createUser(user: User) {
    return axios.post(this.apiUrl, user);
  }

  // PUT - Actualizar usuario
  updateUser(id: number, user: User) {
    return axios.put(`${this.apiUrl}?id=${id}`, user);
  }

  // PATCH - Activar o desactivar usuario
  changeStatus(id: number, status: string) {
    return axios.patch(`${this.apiUrl}?id=${id}`, {
      status: status
    });
  }

  // DELETE - Eliminar usuario
  deleteUser(id: number) {
    return axios.delete(`${this.apiUrl}?id=${id}`);
  }
}
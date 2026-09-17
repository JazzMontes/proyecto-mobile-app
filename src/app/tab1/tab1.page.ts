import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent
  ],
})
export class Tab1Page implements OnInit {

  users: User[] = [];

  user: User = {
    username: '',
    email: '',
    name: '',
    password: '',
    status: 'active'
  };

  editingId: number | null = null;

  // Control del modal de eliminación
  showDeleteModal = false;
  userToDelete: User | null = null;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  // GET
  async loadUsers() {
    try {

      const response =
        await this.userService.getUsers();

      this.users = response.data;

      this.cdr.detectChanges();

    } catch (error) {
      console.error(
        'Error al obtener usuarios:',
        error
      );
    }
  }

  // POST o PUT
  async saveUser() {
    try {

      if (this.editingId !== null) {

        await this.userService.updateUser(
          this.editingId,
          this.user
        );

      } else {

        await this.userService.createUser(
          this.user
        );
      }

      this.clearForm();

      await this.loadUsers();

    } catch (error) {
      console.error(
        'Error al guardar usuario:',
        error
      );
    }
  }

  // Preparar edición
  editUser(user: User) {

    this.editingId = user.id ?? null;

    this.user = {
      ...user,
      password: ''
    };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // PATCH - Activar / desactivar
  async toggleStatus(user: User) {

    if (!user.id) {
      return;
    }

    try {

      const newStatus =
        user.status === 'active'
          ? 'inactive'
          : 'active';

      await this.userService.changeStatus(
        user.id,
        newStatus
      );

      await this.loadUsers();

    } catch (error) {
      console.error(
        'Error al cambiar estado:',
        error
      );
    }
  }

  // Abrir confirmación de eliminación
  openDeleteModal(user: User) {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  // Cerrar confirmación
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  // DELETE
  async confirmDelete() {
    const id = this.userToDelete?.id;

    if (!id) {
      this.closeDeleteModal();
      return;
    }

    try {
      await this.userService.deleteUser(id);
      this.closeDeleteModal();
      await this.loadUsers();
    } catch (error) {
      console.error(
        'Error al eliminar usuario:',
        error
      );
    }
  }

  // Limpiar formulario
  clearForm() {

    this.editingId = null;

    this.user = {
      username: '',
      email: '',
      name: '',
      password: '',
      status: 'active'
    };
  }
}
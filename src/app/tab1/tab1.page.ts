import { 
  Component, 
  OnInit, 
  ChangeDetectorRef 
} from '@angular/core'; 
 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { IonContent } from '@ionic/angular'; 
 
// Servicio encargado de las operaciones relacionadas con usuarios
import { UserService } from '../services/user.service'; 

// Modelo que define la estructura que debe tener un usuario
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
 
  // Arreglo donde se guardan los usuarios obtenidos
  users: User[] = []; 
 
  // Usuario utilizado para capturar los datos del formulario
  user: User = { 
    username: '', 
    email: '', 
    name: '', 
    password: '', 
    status: 'active' 
  }; 
 
  // Guarda el ID cuando se está editando un usuario
  editingId: number | null = null; 
 
  // Control del modal de eliminación 
  showDeleteModal = false; 
  userToDelete: User | null = null; 
 
  // UserService permite utilizar las operaciones de usuarios
  constructor( 
    private userService: UserService, 
    private cdr: ChangeDetectorRef 
  ) {} 
 
  // Al iniciar la pantalla se cargan los usuarios
  ngOnInit() { 
    this.loadUsers(); 
  } 
 
  // GET - Obtiene la lista de usuarios
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
 
  // POST o PUT - Crea un usuario nuevo o actualiza uno existente
  async saveUser() { 
    try { 
 
      // Si existe un editingId se actualiza el usuario
      if (this.editingId !== null) { 
 
        await this.userService.updateUser( 
          this.editingId, 
          this.user 
        ); 
 
      } else { 
 
        // Si no estamos editando, se crea un usuario nuevo
        await this.userService.createUser( 
          this.user 
        ); 
      } 
 
      // Limpia el formulario y vuelve a cargar la lista
      this.clearForm(); 
 
      await this.loadUsers(); 
 
    } catch (error) { 
      console.error( 
        'Error al guardar usuario:', 
        error 
      ); 
    } 
  } 
 
  // Prepara los datos del usuario seleccionado para poder editarlo
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
 
  // PATCH - Cambia el estado del usuario entre active e inactive
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
 
  // Guarda el usuario seleccionado y abre la confirmación de eliminación
  openDeleteModal(user: User) { 
    this.userToDelete = user; 
    this.showDeleteModal = true; 
  } 
 
  // Cerrar confirmación 
  closeDeleteModal() { 
    this.showDeleteModal = false; 
    this.userToDelete = null; 
  } 
 
  // DELETE - Elimina el usuario seleccionado mediante su ID
  async confirmDelete() { 
    const id = this.userToDelete?.id; 
 
    if (!id) { 
      this.closeDeleteModal(); 
      return; 
    } 
 
    try { 
      await this.userService.deleteUser(id); 
      this.closeDeleteModal(); 

      // Actualiza nuevamente la lista después de eliminar
      await this.loadUsers(); 
    } catch (error) { 
      console.error( 
        'Error al eliminar usuario:', 
        error 
      ); 
    } 
  } 
 
  // Limpia el formulario y deja de estar en modo edición
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

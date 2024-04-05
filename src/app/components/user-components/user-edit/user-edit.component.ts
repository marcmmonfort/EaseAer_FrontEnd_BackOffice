import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  userData!: User;
  userId!: string;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  
  constructor(private route: ActivatedRoute, private userService: UserService,private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.userId = parts[parts.length - 1];
    console.log(this.userId);
    this.userService.getUser(this.userId).subscribe(userData=>{
      console.log(userData);
      this.userData=userData;
    });
  }
  onSubmit():void{
      this.openModal();
    
  }
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  confirmChanges(): void {
    this.userService.updateUser(this.userData, this.userId).subscribe(() => {
      this.openNotificationModal("¡Actualización Satisfactoria!");
      // this.closeModal();
    });
  }
  
  getRolText(rol: string): string {
    switch (rol) {
      case 'admin':
        return 'Administrador/a';
      case 'common':
        return 'Cuenta común';
      case 'verified':
        return 'Cuenta verificada';
      case 'business':
        return 'Cuenta de Empresa';
      default:
        return rol;
    }
  }

  onAcceptChanges(): void {
    if (this.modalText == ""){
      this.confirmChanges();
      this.modalText = "";
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
    if (this.modalText == "¡Actualización Satisfactoria!"){
      this.modalText = "";
      this.router.navigate(['/users']);
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
    else {
      this.modalText = "";
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
  }
  
  onCancelChanges(): void {
    this.isModalOpen = false;
    this.isNotificationOpen = false;
    this.loadUserData();
  }

  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  // Notification Modal:

  openNotificationModal(text: string): void {
    this.modalText = text;
    this.isNotificationOpen = true;
  }

  // Método para cerrar el modal
  closeNotificationModal(): void {
    this.isNotificationOpen = false;
  }
  
}

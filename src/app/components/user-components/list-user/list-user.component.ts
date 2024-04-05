import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  numPage: string = '';
  searchTerm: string = '';
  printeado: boolean = false;
  isNotificationOpen: boolean = false;
  modalText: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.printeado = false;
    this.numPage="1";
  }

  showDetails(user: User): void {
    this.router.navigate(['/users/details', user.uuid]);
  }
  showEdit(user: User): void {
    this.router.navigate(['/users/edit', user.uuid]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredUsers = this.users.filter((user) =>
        user.mailUser.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }   
  }

  printeaTodos() {
    this.userService.getUsersPag(this.numPage).subscribe((users) => {
      if(users.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        
        if(parseInt(this.numPage, 10) < 1){
          this.numPage = '1';
        }

        this.openNotificationModal("¡No hay más páginas!");
      }
      else{
        console.log(users);
        this.filteredUsers = users;
        if (!this.printeado){
          this.openNotificationModal("Usuarios Cargados");
        }
        this.printeado = true;
      }
    });
  }

  paginatenext() {
    if (this.printeado) {
      this.numPage = (parseInt(this.numPage, 10) + 1).toString();
      this.printeaTodos();
    }
  }

  paginateprevious() {
    if (this.printeado) {
      if (this.numPage == '1') {
        this.openNotificationModal("¡Estás en la primera página!");

        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }

  // Notification Modal:

  onAcceptChanges(): void {
    this.isNotificationOpen = false;
    if (this.modalText == "¡Bienvenid@!"){
      this.modalText = "";
      this.router.navigate(['/home']);
    }
  }

  onCancelChanges(): void {
    this.isNotificationOpen = false;
  }

  openNotificationModal(text: string): void {
    this.modalText = text;
    this.isNotificationOpen = true;
  }

  // Método para cerrar el modal
  closeNotificationModal(): void {
    this.isNotificationOpen = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService,private authservice:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      "appUser": ['', Validators.required],
      "nameUser": ['', Validators.required],
      "surnameUser": ['', Validators.required],
      "mailUser": ['', [Validators.required, Validators.email]],
      "passwordUser": ['', Validators.required],
      "photoUser": ['', Validators.required],
      "birthdateUser": ['', Validators.required],
      "genderUser": ['', Validators.required],
      "descriptionUser": ['', Validators.required],
      "roleUser": ['', Validators.required],
      "privacyUser": [false, Validators.required],
      "recordGameUser": [0],
      "flightsUser": [[]],
      "deletedUser": [false, Validators.required],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.openNotificationModal("¡Faltan campos por completar!");
    }
    this.openModal();
  }
  
  confirmChanges(): void {
    const userData = this.userForm.value;
    this.authservice.addUser(userData).subscribe(
      (response) => {
        this.openNotificationModal("¡Registrad@!");
        console.log('Usuario guardado correctamente:', response);
      },
      (error) => {
        console.error('Error al guardar usuario:', error);
        this.openNotificationModal("¡Error!");
      }
    );
    this.closeModal();
  }

  onAcceptChanges(): void {
    if (this.modalText == ""){
      this.confirmChanges();
      this.ngOnInit();
      this.modalText = "";
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
    if (this.modalText == "¡Registrad@!"){
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
  }

  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
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


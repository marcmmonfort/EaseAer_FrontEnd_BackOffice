import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { KnownService } from 'src/app/services/known.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup | any;
  userKnown:boolean=false;
  securityLevel: number = 1;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';

  constructor(private formBuilder: FormBuilder, private loginService: AuthService, private userService: UserService, private knownService: KnownService, private router: Router) {
    
    this.loginForm = this.formBuilder.group({
      "mailUser": ['', [Validators.required, Validators.email]],
      "passwordUser": ['', Validators.required]
    });
  }
  
  
  ngOnInit(): void {
    localStorage.setItem('token','');
    localStorage.setItem('role','');
    this.knownService.getUserKnown().subscribe(userKnown => {
      this.userKnown = userKnown;
    });
    this.knownService.getSecurityLevel().subscribe(securityLevel => {
      this.securityLevel = securityLevel;
    });
  }
  

  get f() {
    return this.loginForm.controls;
  }

  login(): void{
    const authData = this.loginForm.value;
    console.log("Mail: ",this.loginForm.value.mailUser);
    console.log("Password: ",this.loginForm.value.passwordUser);
    this.loginService.logIn(authData).subscribe(
      (data:any)=>{
        console.log("DATA:" + JSON.stringify(data));
        
        localStorage.setItem('token',data.token);

        // MECANISMO PARA GUARDAR TU PROPIA ID:
        console.log("CORREO: ",this.loginForm.value.mailUser);
        this.userService.getUserByEmail(this.loginForm.value.mailUser).subscribe(
          (response) => {
            console.log("RECIBE:" + JSON.stringify(response));
            if (response.uuid){
              console.log("ENTRA CON ID: " + response.uuid);
              localStorage.setItem('ownId', response.uuid);
              localStorage.setItem('role', response.roleUser);

              this.knownService.updateUserKnown(true);

              console.log("ROL LOCAL STORAGE: " + localStorage.getItem('role'));
              console.log("ROL INTERNO: " + response.roleUser);

              if (localStorage.getItem('role')==="pax"){
                this.knownService.updateSecurityLevel(1);
              }
              if (localStorage.getItem('role')==="company"){
                this.knownService.updateSecurityLevel(2);
              }
              if (localStorage.getItem('role')==="admin"){
                this.knownService.updateSecurityLevel(3);
              }
              if (localStorage.getItem('role')==="tech"){
                this.knownService.updateSecurityLevel(4);
              }
      
              this.openNotificationModal("¡Bienvenid@!");
            }
            else {
              this.openNotificationModal("¡Error!");
            }
          },
          (error) => {
            this.openNotificationModal("¡Error!");
          }
        );

      },(error:any)=>{
        console.log(error.status);

        switch (error.status) {
          case 403:
            this.openNotificationModal("Contraseña Incorrecta");
            break;
          case 406:
              this.openNotificationModal("No Eres Admininstrador");
            break; 
          default: 
            this.openNotificationModal("¡Error!");
            break;
        }
      });
  }

  onAcceptChanges(): void {
    this.isNotificationOpen = false;
    if (this.modalText == "¡Bienvenid@!"){
      this.modalText = "";
      this.router.navigate(['/home']);
    }
  }

  onCancelChanges(): void {
    this.isModalOpen = false;
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

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { KnownService } from 'src/app/services/known.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup | any;
  userKnown:boolean=false;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';

  constructor(private formBuilder: FormBuilder, private loginService: AuthService, private knownService: KnownService, private router: Router) {
    
    this.loginForm = this.formBuilder.group({
      "mailUser": ['', [Validators.required, Validators.email]],
      "passwordUser": ['', Validators.required]
    });
  }
  
  
  ngOnInit(): void {
    localStorage.setItem('token','');
    this.knownService.getUserKnown().subscribe(userKnown => {
      this.userKnown = userKnown;
    });
  }
  

  get f() {
    return this.loginForm.controls;
  }

  login(): void{
    const authData = this.loginForm.value;
    console.log("Mail:",this.loginForm.value.mailUser);
    console.log("Password:",this.loginForm.value.passwordUser);
    this.loginService.logIn(authData).subscribe(
      (data:any)=>{
        console.log(data);

        // NOTIFICATION (Success)
        
        localStorage.setItem('token',data.token);
        
        this.knownService.updateUserKnown(true);
        this.openNotificationModal("Success!"); // Poner texto aquí.

      },(error:any)=>{
        console.log(error.status);

        switch (error.status) {
          case 403:
              // NOTIFICATION (Incorrect Password)
            break;
          case 406:
              // NOTIFICATION (Not Admin)
            break; 
          default: 
            // NOTIFICATION (Error)
            this.router.navigate(['/register']);
            break;
        }
      });
  }

  onAcceptChanges(): void {
    this.isModalOpen = false;
    this.router.navigate(['/home']);
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

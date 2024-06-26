import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup | any;
  registerFormCode: FormGroup | any;
  userKnown:boolean=false;
  isModalOpen:boolean=false;
  showAdditionalForm: boolean = false;
  isNotificationOpen: boolean = false;
  modalText: string = '';

  constructor(private formBuilder: FormBuilder, private registerService: AuthService, private router: Router) {
    
    this.registerForm = this.formBuilder.group({
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
      "code": ['']
    });
  }

  toggleAdditionalForm(): void {
    const roleUserValue = this.registerForm.get('roleUser').value;
    this.showAdditionalForm = ['pax'].includes(roleUserValue);
  }
  
  ngOnInit(): void {
    localStorage.setItem('token','');
  }

  get f() {
    return this.registerForm.controls;
  }

  register(): void{
    if (this.registerForm.invalid) {
      return;
    }
    this.openModal();
  }

  confirmChanges(): void {
    console.log("DATA 0:" + this.registerForm.value.appUser);

    const userData = this.registerForm.value;
    userData.birthdateUser = new Date(userData.birthdateUser);

    console.log("DATA 1:" + JSON.stringify(userData));

    let allowedAccess = false;

    if (userData.roleUser == "company" || userData.roleUser == "admin" || userData.roleUser == "tech"){
      if ((userData.roleUser == "company") && (userData.code == "ea_bcn_company_0624")){
        allowedAccess = true;
      }
      if ((userData.roleUser == "admin") && (userData.code == "ea_bcn_admin_0624_B8F3G5M2")){
        allowedAccess = true;
      }
      if ((userData.roleUser == "tech") && (userData.code == "ea_bcn_tech_0624_N1U7D9K4")){
        allowedAccess = true;
      }
    }
    if (userData.roleUser == "pax")
    {
      allowedAccess = true;
    }

    userData.uuid = " ";
    delete userData.code;

    if (allowedAccess == true) {
      this.registerService.addUser(userData).subscribe(
        (data:any)=>{
          console.log(data);
          this.openNotificationModal("¡Registrad@!");
        },(error:any)=>{
          this.openNotificationModal("¡Error!");
        });
      this.closeModal();
    }
    else {
      this.openNotificationModal("Código Incorrecto");
    }
  }

  onAcceptChanges(): void {
    if (this.modalText == ""){
      this.confirmChanges();
      this.modalText = "";
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
    if (this.modalText == "¡Registrad@!"){
      this.modalText = "";
      this.router.navigate(['/login']);
      this.isModalOpen = false;
      this.isNotificationOpen = false;
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

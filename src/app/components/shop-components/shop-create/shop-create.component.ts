import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';
import { Shop } from 'src/app/interfaces/shop.interface';

@Component({
  selector: 'app-shop-create',
  templateUrl: './shop-create.component.html',
  styleUrls: ['./shop-create.component.css']
})

export class ShopCreateComponent {
  shopForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  scheduleShop: string = '';
  showAdditionalOption: boolean = true;

  constructor(private formBuilder: FormBuilder, private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {

    this.shopForm = this.formBuilder.group({
        "idCompanyShop": ['', Validators.required],
        "idLocationShop": ['', Validators.required],
        "descriptionShop": ['', Validators.required],
        "webShop": ['', Validators.required],
        "sunOpen": ['', Validators.required],
        "sunClose": ['', Validators.required],
        "monOpen": ['', Validators.required],
        "monClose": ['', Validators.required],
        "tueOpen": ['', Validators.required],
        "tueClose": ['', Validators.required],
        "wedOpen": ['', Validators.required],
        "wedClose": ['', Validators.required],
        "thuOpen": ['', Validators.required],
        "thuClose": ['', Validators.required],
        "friOpen": ['', Validators.required],
        "friClose": ['', Validators.required],
        "satOpen": ['', Validators.required],
        "satClose": ['', Validators.required],
        "deletedShop": [false, Validators.required]
    });
  }

  get f() {
    return this.shopForm.controls;
  }

  onSubmit(): void {
    if (this.shopForm.valid) {
        // Nada.
    }
    if (this.shopForm.invalid) {
      this.openNotificationModal("¡Información Incorrecta!");
    }
    this.openModal();
  }

  confirmChanges(): void {
    const shopData = this.shopForm.value;

    console.log("INFO FORMULARIO:", JSON.stringify(shopData));

    const scheduleSunday = `${shopData.sunOpen}_${shopData.sunClose}`;
    const scheduleMonday = `${shopData.monOpen}_${shopData.monClose}`;
    const scheduleTuesday = `${shopData.tueOpen}_${shopData.tueClose}`;
    const scheduleWednesday = `${shopData.wedOpen}_${shopData.wedClose}`;
    const scheduleThursday = `${shopData.thuOpen}_${shopData.thuClose}`;
    const scheduleFriday = `${shopData.friOpen}_${shopData.friClose}`;
    const scheduleSaturday = `${shopData.satOpen}_${shopData.satClose}`;

    this.scheduleShop = `${scheduleSunday}|${scheduleMonday}|${scheduleTuesday}|${scheduleWednesday}|${scheduleThursday}|${scheduleFriday}|${scheduleSaturday}`;

    // Borrar Horarios Diarios:
    this.shopForm.removeControl('sunOpen');
    this.shopForm.removeControl('sunClose');
    this.shopForm.removeControl('monOpen');
    this.shopForm.removeControl('monClose');
    this.shopForm.removeControl('tueOpen');
    this.shopForm.removeControl('tueClose');
    this.shopForm.removeControl('wedOpen');
    this.shopForm.removeControl('wedClose');
    this.shopForm.removeControl('thuOpen');
    this.shopForm.removeControl('thuClose');
    this.shopForm.removeControl('friOpen');
    this.shopForm.removeControl('friClose');
    this.shopForm.removeControl('satOpen');
    this.shopForm.removeControl('satClose');

    const newShopData = this.shopForm.value;

    // Añadir Horario Conjunto:
    newShopData.scheduleShop = this.scheduleShop;

    console.log("INFO EDITADA:", JSON.stringify(newShopData));

    this.shopService.createShop(newShopData).subscribe(
      (response) => {
        this.openNotificationModal("¡Comercio Creado!");
      },
      (error) => {
        this.openNotificationModal("¡Error!");
      }
    );

    this.closeModal();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onAcceptChanges(): void {
    if (this.modalText == ""){
      this.confirmChanges();
      this.ngOnInit();
      this.modalText = "";
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
    if (this.modalText == "¡Comercio Creado!"){
      this.modalText = "";
      this.router.navigate(['/shops']);
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

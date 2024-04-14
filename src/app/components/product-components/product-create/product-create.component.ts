import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent {

  prodForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  showAdditionalOption: boolean = true;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {

    this.prodForm = this.formBuilder.group({
        "nameProduct": ['', Validators.required],
        "descriptionProduct": ['', Validators.required],
        "codeProduct": ['0', Validators.required],
        "deletedProduct": [false, Validators.required],
    });
  }

  get f() {
    return this.prodForm.controls;
  }

  onSubmit(): void {
    console.log(this.prodForm);
    if (this.prodForm.invalid) {
      this.openNotificationModal("¡Información Incorrecta!");
    }
    this.openModal();
  }
  
  confirmChanges(): void {
    const prodData = this.prodForm.value;
    console.log("DETALLES:" + JSON.stringify(prodData));

    this.productService.createProduct(prodData).subscribe(
      (response) => {
        this.openNotificationModal("¡Producto Creado!");
      },
      (error) => {
        this.openNotificationModal("¡Error!");
      }
    );
    this.closeModal();
    // this.router.navigate(['/cards']);
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
    if (this.modalText == "¡Producto Creado!"){
      this.modalText = "";
      this.router.navigate(['/products']);
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

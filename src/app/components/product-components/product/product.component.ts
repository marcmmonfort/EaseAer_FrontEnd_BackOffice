import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})

export class ProductComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  searchProductByName: string = '';
  searchProductByCode: string = '';

  numPage: string = '';
  printeado: boolean = false;

  isNotificationOpen: boolean = false;
  modalText: string = '';
  
  constructor(private productService: ProductService, private router: Router) {}
  
  ngOnInit(): void {
    this.productService.listProducts().subscribe((products) => {
      this.products = products;
    });
    this.printeado = false;
    this.numPage="1";
  }

  showDetails(card: any): void {
    this.router.navigate(['/products/details/', card.uuid]);
  }

  showEdit(card: any): void {
    this.router.navigate(['/products/edit/', card.uuid]);
  }

  searchByName() {
    if (this.searchProductByName.trim() !== '') {
      this.filteredProducts = this.products.filter((product) =>
        product.nameProduct
          .toLowerCase()
          .includes(this.searchProductByName.toLowerCase())
      );
    } 
  }

  searchByCode() {
    if (this.searchProductByCode.trim() !== '') {
      this.filteredProducts = this.products.filter((product) =>
        product.codeProduct
          .toLowerCase()
          .includes(this.searchProductByCode.toLowerCase())
      );
    } 
  }

  printeaTodos() {
    this.productService.listProductsPag(this.numPage).subscribe((products) => {
      if(products.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        
        if(parseInt(this.numPage, 10) < 1){
          this.numPage = '1';
        }

        this.openNotificationModal("¡No hay más páginas!");
      }
      else{
        this.filteredProducts = products;
        if (!this.printeado){
          this.openNotificationModal("Productos Cargados");
        }
        this.printeado = true;
        
      }
    });
  }

  paginateNext() {
    if (this.printeado) {
      this.numPage = (parseInt(this.numPage, 10) + 1).toString();
      this.printeaTodos();
    }
  }

  paginatePrevious() {
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
    if (this.modalText == "Productos Cargados"){
      this.modalText = "";
      // this.router.navigate(['/cards']);
    }
  }

  onCancelChanges(): void {
    this.isNotificationOpen = false;
  }

  openNotificationModal(text: string): void {
    this.modalText = text;
    this.isNotificationOpen = true;
  }

  closeNotificationModal(): void {
    this.isNotificationOpen = false;
  }

}

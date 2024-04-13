import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'shop-location',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})

export class ShopComponent implements OnInit {
  shops: any[] = [];
  filteredShops: any[] = [];
  searchCompany: string = '';
  printeado: boolean = false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  
  constructor(private shopService: ShopService, private router: Router) {}
  
  ngOnInit(): void {
    this.shopService.listShops().subscribe((shops) => {
      this.shops = shops;
    });
    this.printeado = false;
  }

  showDetails(shop: any): void {
    this.router.navigate(['/shops/details/', shop.uuid]);
  }

  showEdit(shop: any): void {
    this.router.navigate(['/shops/edit/', shop.uuid]);
  }

  searchByCompanyID() {
    if (this.searchCompany.trim() !== '') {
      this.filteredShops = this.shops.filter((shop) =>
        shop.nameLocation
          .toLowerCase()
          .includes(this.searchCompany.toLowerCase())
      );
    } 
  }

  printeaTodos() {
    this.shopService.listShops().subscribe((shops) => {
      if(shops.length==0){
        this.openNotificationModal("¡No hay más páginas!");
      }
      else{
        this.filteredShops = shops;
        if (!this.printeado){
          this.openNotificationModal("Comercios Cargados");
        }
        this.printeado = true;
      }
    });
  }

  // Notification Modal:

  onAcceptChanges(): void {
    this.isNotificationOpen = false;
    if (this.modalText == "¡Comercio Creado!"){
      this.modalText = "";
      this.router.navigate(['/shops']);
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

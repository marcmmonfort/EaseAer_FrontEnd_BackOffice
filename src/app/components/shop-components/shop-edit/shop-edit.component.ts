import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent {
  shopData: any;
  shopId!: string;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  isDeleteUp:boolean=false;
  isEditUp:boolean=false;
  
  constructor(private route: ActivatedRoute, private shopService: ShopService, private router:Router) {}

  ngOnInit(): void {
    this.loadLocationData();
  }

  loadLocationData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.shopId = parts[parts.length - 1];
    console.log(this.shopId);
    this.shopService.getShopById(this.shopId).subscribe(shopData=>{
      this.shopData=shopData;
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
    this.isDeleteUp = false;
    this.isEditUp = false;
  }
  confirmChanges(): void {

      this.shopService.updateShop(this.shopData, this.shopId).subscribe(() => {
        this.openNotificationModal("¡Actualización Satisfactoria!");
      });
      
      if(this.isDeleteUp){
        this.closeModal();
        this.shopService.deleteShop(this.shopId).subscribe( 
          
          (data:any)=>{
            this.openNotificationModal("¡Borrada Satisfactoriamente!");
          },(error:any)=>{
            console.log(error.status);
    
            switch (error.status) {
              case 401:
                this.openNotificationModal("¡No Estás Autorizado!");
                break;
              case 402:
                this.openNotificationModal("¡No Eres Administrador!");
                break; 
              default: 
                this.openNotificationModal("¡Error!");
              }
        })  
      } 
  }

  onAcceptChanges(): void {
    if (this.modalText == ""){
      this.confirmChanges();
      this.modalText = "";
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
    if (this.modalText == "¡Borrada Satisfactoriamente!" || this.modalText == "¡Actualización Satisfactoria!"){
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
    this.closeModal();
    this.loadLocationData();
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

  eliminar(){
    this.isDeleteUp=true;
    this.openModal();
  }
  editar(){
    this.isEditUp=true;
    this.openModal();
  }
}

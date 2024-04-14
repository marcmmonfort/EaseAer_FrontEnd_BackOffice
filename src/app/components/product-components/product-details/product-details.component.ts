import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: any;
  productId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private productService: ProductService, private router:Router) {}

  ngOnInit(): void {
    this.loadProductData();
  }

  loadProductData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.productId = parts[parts.length - 1];
    console.log(this.productId);
    this.productService.getProductById(this.productId).subscribe(productData=>{
      this.productData=productData;
    });
  }

}

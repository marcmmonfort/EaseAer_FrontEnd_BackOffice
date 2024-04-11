import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    product!: Product;
    message!: String;
    private productSource = new BehaviorSubject(this.product);
    currentProduct = this.productSource.asObservable();

    private apiURLProduct = environment.API_URL + '/product/';

    // ROUTE 1: routeProduct.post("/product/create", productCtrl.createProductCtrl);
    private apiURLProductCreate = environment.API_URL + '/product/create';
    // ROUTE 2: routeProduct.get("/product/getbyid/:uuid", checkJwt, productCtrl.getProductByIdCtrl);
    private apiURLProductGetById = environment.API_URL + '/product/getbyid/';
    // ROUTE 3: routeProduct.get("/product/getbyname/:name", productCtrl.getProductsByNameCtrl);
    private apiURLProductGetByName = environment.API_URL + '/product/getbyname/';
    // ROUTE 4: routeProduct.get("/product/getbycode/:code", productCtrl.getProductsByCodeCtrl);
    private apiURLProductGetByCode = environment.API_URL + '/product/getbycode/';
    // ROUTE 5: routeProduct.put("/product/update/:uuid", checkJwt, productCtrl.updateProductCtrl);
    private apiURLProductUpdate = environment.API_URL + '/product/update/';
    // ROUTE 6: routeProduct.delete("/product/delete/:uuid", checkJwt, productCtrl.deleteProductCtrl);
    private apiURLProductDelete = environment.API_URL + '/product/delete/';
    // ROUTE 7: routeProduct.get("/product/all/count/docs", checkJwt, productCtrl.getNumProductsCtrl);
    private apiURLProductGetNum = environment.API_URL + '/product/all/count/docs';
    // ROUTE 8: routeProduct.get("/product/listproducts/all", checkJwt, productCtrl.listProductsCtrl);
    private apiURLProductList = environment.API_URL + '/product/listproducts/all';
    // ROUTE 9: routeProduct.get("/product/listproductspag/:numPage", checkJwt, productCtrl.listProductsPagCtrl);
    private apiURLProductListPag = environment.API_URL + '/product/listproductspag/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: "/product/create" | createProduct | apiURLProductCreate
    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiURLProductCreate, product,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: "/product/getbyid/:uuid" | getProductById | apiURLProductGetById
    getProductById(uuid: string): Observable<Product> {
        return this.http.get<Product>(this.apiURLProductGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/product/getbyname/:name" | getProductsByName | apiURLProductGetByName
    getProductsByName(name: string): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProductGetByName + name, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 4: "/product/getbycode/:code" | getProductsByCode | apiURLProductGetByCode
    getProductsByCode(code: string): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProductGetByCode + code, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 5: "/product/update/:uuid" | updateProduct | apiURLProductUpdate
    updateProduct(product: Product, id: string): Observable<Product> {
        return this.http.put<Product>(this.apiURLProductUpdate + id, product,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: "/product/delete/:uuid" | deleteProduct | apiURLProductDelete
    deleteProduct(uuid: string): Observable<Product> {
        return this.http.delete<Product>(this.apiURLProductDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 7: "/product/all/count/docs" | getNumProducts | apiURLProductGetNum
    getNumProducts(): Observable<string> {
        return this.http.get<string>(this.apiURLProductGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 8: "/product/listproducts/all" | listProducts | apiURLProductList
    listProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProductList, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 9: "/product/listproductspag/:numPage" | listProductsPag | apiURLProductListPag
    listIncidentsPag(numPage: string): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProductListPag + numPage, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}
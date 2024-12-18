import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@models/data/general.model';
import { Product } from '@models/data/product.model';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = '';

  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  storedProducts$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.BACKEND_URL}${environment.BACKEND_PATH}`;
    this.findAll();
  }

  private findAll() {
    this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/product`).subscribe({
      next: (products) => {
        this.products = products.data;
        this.productsSubject.next(this.products);
      },
      error: (error) => {
        console.log("error finding products: ", error);
      }
    })
  }

  getAll() {
    return this.storedProducts$.pipe();
  }

  getByCategoryLikeName(categoryId: number, name: string) {
    return this.storedProducts$
      .pipe(
        map(products => products.filter(product => 
          product.subcategory.category.id == categoryId &&
          product.name.toLowerCase().includes(name.toLowerCase()))
        )
      );
  }

  getLikeName(name: string) {
    return this.storedProducts$
      .pipe(
        map(products => products.filter(product => product.name.toLowerCase().includes(name.toLowerCase())))
      );
  }

  getByCategoryAndMinPrice(categoryId: number, min: number) {
    return this.storedProducts$
      .pipe(
        map(products => products.filter(product => 
          product.subcategory.category.id == categoryId &&
          product.price >= min)
        )
      );
  }

  getByCategoryAndMaxPrice(categoryId: number, max: number) {
    return this.storedProducts$
      .pipe(
        map(products => products.filter(product => 
          product.subcategory.category.id == categoryId &&
          product.price <= max)
        )
      );
  }

  getByCategoryBetweenPrice(categoryId: number, min: number, max: number) {
    return this.storedProducts$
      .pipe(
        map(products => products.filter(product => 
          product.subcategory.category.id == categoryId &&
          product.price >= min && product.price <= max)
        )
      );
  }

  getBetweenPrice(min: number, max: number) {
    return this.storedProducts$
      .pipe(
        map(products => products.filter(product => product.price >= min && product.price <= max))
      );
  }

  getByCategoryAndSubcategory(categoryId: number, subcategory: string) {
    return this.storedProducts$
      .pipe(
        map(products => products.filter(product => 
          product.subcategory.category.id == categoryId &&
          product.subcategory.name.toLowerCase() == subcategory.toLowerCase())
        )
      );
  }

  getBySubcategory(subcategory: string) {
    return this.storedProducts$
      .pipe(
        map(products => products.filter(product => product.subcategory.name.toLowerCase() == subcategory.toLowerCase()))
      );
  }

}

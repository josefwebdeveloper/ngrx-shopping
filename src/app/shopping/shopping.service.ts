import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Shop } from './models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor(private http: HttpClient) {}

  getInitialProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products.json');
  }

  getInitialShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>('assets/shops.json');
  }
}

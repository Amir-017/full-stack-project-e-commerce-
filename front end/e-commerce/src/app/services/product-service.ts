import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiResponse,
  ProductDetailsResponse,
  SearchProductsResponse,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getproducts() {
    return this.http.get<ApiResponse>('http://localhost:3000/products');
  }

  getProductsByCategory(category: string) {
    return this.http.get<ApiResponse>(`http://localhost:3000/products/category/${category}`);
  }

  getProductById(id: string) {
    return this.http.get<ProductDetailsResponse>(`http://localhost:3000/products/${id}`);
  }

  searchProducts(search: string, page: number, limit = 10) {
    return this.http.get<SearchProductsResponse>('http://localhost:3000/products/', {
      params: {
        search,
        page,
        limit,
      },
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import {
  ApiResponse,
  CreateProductRequest,
  DashboardProductsResponse,
  ProductDetailsResponse,
  Product,
  SearchProductsResponse,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getproducts(page = 1, limit = 10) {
    return this.http
      .get<DashboardProductsResponse>('http://localhost:3000/products', {
        params: {
          dashboardAdmin: 1,
          page,
          limit,
        },
      })
      .pipe(tap((response) => console.log('dashboard products response:', response)));
  }

  getProductsByCategory(category: string) {
    return this.http.get<ApiResponse>(`http://localhost:3000/products/category/${category}`);
  }

  getProductById(id: string) {
    return this.http.get<ProductDetailsResponse>(`http://localhost:3000/products/${id}`);
  }

  addProduct(productData: CreateProductRequest, token: string) {
    return this.http.post('http://localhost:3000/products', productData, {
      headers: {
        authorization: token,
      },
    });
  }

  deleteProduct(productId: string, token: string) {
    return this.http.delete(`http://localhost:3000/products/${productId}`, {
      headers: {
        authorization: token,
      },
    });
  }

  updateProduct(productId: string, productData: Partial<Product>, token: string) {
    return this.http.patch(`http://localhost:3000/products/${productId}`, productData, {
      headers: {
        authorization: token,
      },
    });
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

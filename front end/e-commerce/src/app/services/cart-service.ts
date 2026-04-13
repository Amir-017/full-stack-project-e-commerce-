// import { cartResponse } from './cart-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CartProduct {
  _id: string;
  title: string;
  price: number;
  images: string[];
  description:string 
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface CartResponse {
  data: CartItem[];
}
////////////////////////

export interface ProductItem {
  product: any; // لو مش مهتم بتفاصيله دلوقتي
  quantity: number;
  _id: string;
}
export interface UserName {
  name: string;
  email: string;
  role: string;
  _id: string;
}
export interface Cart {
  products: ProductItem[];
  userName: UserName;
}



export interface cartResponse {
  status: number;
  message: string;
  data: Cart[];
}
// export interface cartResponse2{
//   products:cartResponse[] ,
// }
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(productId: string) {
    const token = localStorage.getItem('accessToken') ?? '';

    return this.http.post(
      'http://localhost:3000/cart/addTocart',
      {
        products: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      },
      {
        headers: {
          authorization: token,
        },
      },
    );
  }

  getCart() {
    const token = localStorage.getItem('accessToken') ?? '';

    return this.http.get<CartResponse>('http://localhost:3000/cart', {
      headers: {
        authorization: token,
      },
    });
  }

  getAllCarts() {
    const token = localStorage.getItem('accessToken') ?? '';

    return this.http.get<cartResponse>('http://localhost:3000/cart/allCart', {
      headers: {
        authorization: token,
      },
    });
  }

  updateQuantity(quantity: number, productId: string) {
    const token = localStorage.getItem('accessToken') ?? '';

    return this.http.patch(
      `http://localhost:3000/cart/${productId}`,
      {
        quantity: quantity,
      },
      {
        headers: {
          authorization: token,
        },
      },
    );
  }

  deleteSpecificProduct(productId: string) {
    const token = localStorage.getItem('accessToken') ?? '';

    return this.http.delete(`http://localhost:3000/cart/${productId}`, {
      headers: {
        authorization: token,
      },
    });
  }

  deleteAll() {
    const token = localStorage.getItem('accessToken') ?? '';

    return this.http.delete(`http://localhost:3000/cart`, {
      headers: {
        authorization: token,
      },
    });
  }
}

import { Router } from '@angular/router';
import { CartItem, CartService } from './../../../services/cart-service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-cart',
  imports: [],
  templateUrl: './dashboard-cart.html',
  styleUrl: './dashboard-cart.css',
})
export class DashboardCart implements OnInit {
  products: CartItem[] = [];
  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private router :Router
  ) {}

  getCart() {
    this.cartService.getCart().subscribe((p) => {
      this.products = p.data;
      this.cdr.detectChanges();
      console.log(this.products);
    });
  }

  ngOnInit(): void {
    this.getCart();
  }

  get totalAmount(): number {
    return Number(
      this.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2),
    );
  }

  incressQuantity(quantity: number, productId: string) {
    this.cartService.updateQuantity(quantity, productId).subscribe((response) => {
      console.log(response);
      this.getCart();
    });
  }

  decressQuantity(quantity: number, productId: string) {
    this.cartService.updateQuantity(quantity, productId).subscribe((response) => {
      console.log(response);
      this.getCart();
    });
  }

  deleteProduct(productId: string) {
    this.cartService.deleteSpecificProduct(productId).subscribe((response) => {
      console.log(response);
      this.getCart();
    });
  }


    deleteAllProduct() {
    this.cartService.deleteAll().subscribe((response) => {
      console.log(response);
      this.getCart();
      this.router.navigate(['/'])
    });
  }
}

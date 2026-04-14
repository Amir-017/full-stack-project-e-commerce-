import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: Product | null = null;
  productId = '';
  hasAccessToken = false;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken') ?? '';
    const role = (localStorage.getItem('role') ?? '').toLowerCase();
    this.hasAccessToken = !!token;
    this.isAdmin = role === 'admin';

    this.route.paramMap.subscribe((params) => {
      const rawId = params.get('id');
      this.productId = rawId ?? '';

      // Refresh immediately on page open while waiting for API response.
      this.product = null;
      this.cdr.detectChanges();

      if (!this.productId) {
        return;
      }

      this.productService.getProductById(this.productId).subscribe({
        next: (response) => {
          this.product = response.data;
          this.cdr.detectChanges();
        },
        error: () => {
          this.product = null;
          this.cdr.detectChanges();
        },
      });
    });
  }

  addToCart(id: string): void {
    if (this.isAdmin) {
      return;
    }

    const token = localStorage.getItem('accessToken') ?? '';
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.productId) {
      return;
    }

    this.cartService.addToCart(this.productId).subscribe({
      next: () => {
        this.router.navigate(['/dashboard-cart']);
      },
      error: () => {
        this.router.navigate(['/dashboard-cart']);
      },
    });
  }
}

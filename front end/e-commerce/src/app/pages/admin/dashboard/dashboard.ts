import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product, DashboardProductsResponse } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
  products: Product[] = [];
  page = 1;
  limit = 10;
  total = 0;
  totalPages = 1;
  hasNextPage = false;
  hasPrevPage = false;
  loading = false;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.productService.getproducts(this.page, this.limit).subscribe({
      next: (response: DashboardProductsResponse) => {
        this.products = response.products ?? [];
        this.page = Number(response.page ?? this.page) || 1;
        this.limit = Number(response.limit ?? this.limit) || 10;
        this.total = Number(response.total ?? this.products.length) || 0;
        this.totalPages = Math.max(1, Math.ceil(this.total / this.limit));
        this.hasNextPage = this.page < this.totalPages;
        this.hasPrevPage = this.page > 1;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.products = [];
        this.total = 0;
        this.totalPages = 1;
        this.hasNextPage = false;
        this.hasPrevPage = false;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  goToPage(nextPage: number): void {
    const targetPage = Number(nextPage);

    if (!Number.isFinite(targetPage) || targetPage < 1 || targetPage > this.totalPages) {
      return;
    }

    if (targetPage === this.page) {
      return;
    }

    this.page = targetPage;
    this.fetchProducts();
  }

  deleteProduct(productId: string): void {
    const shouldDelete = window.confirm('Delete this product?');
    const token = localStorage.getItem('accessToken') || '';

    if (!shouldDelete) {
      return;
    }

    this.productService.deleteProduct(productId, token).subscribe({
      next: (response) => {
        console.log('delete product response:', response);
        this.fetchProducts();
      },
      error: (error) => {
        console.error('delete product failed:', error);
        this.fetchProducts();
      },
    });
  }

  goToUpdateProduct(productId: string): void {
    this.router.navigate(['/admin/dashboard/update-product', productId]);
  }
}

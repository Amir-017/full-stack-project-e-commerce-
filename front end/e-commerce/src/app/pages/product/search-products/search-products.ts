import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-search-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './search-products.html',
  styleUrl: './search-products.css',
})
export class SearchProducts implements OnInit {
  searchTerm = '';
  products: Product[] = [];
  page = 1;
  totalPages = 1;
  total = 0;
  limit = 10;
  hasNextPage = false;
  hasPrevPage = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search')?.trim() ?? '';
      const requestedPage = Number(params.get('page') ?? '1');
      this.page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

      if (!this.searchTerm) {
        this.products = [];
        this.total = 0;
        this.totalPages = 1;
        this.hasNextPage = false;
        this.hasPrevPage = false;
        this.cdr.detectChanges();
        return;
      }

      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.productService.searchProducts(this.searchTerm, this.page, this.limit).subscribe({
      next: (response) => {
        this.products = response.products ?? [];

        const responsePage = Number(response.page ?? this.page);
        const responseLimit = Number(response.limit ?? this.limit);
        const responseTotal = Number(response.total ?? this.products.length);
        const fallbackTotalPages = Math.max(
          1,
          Math.ceil(responseTotal / (responseLimit > 0 ? responseLimit : this.limit)),
        );
        const responseTotalPages = Number(response.totalPages ?? fallbackTotalPages);

        this.page = Number.isFinite(responsePage) && responsePage > 0 ? responsePage : 1;
        this.limit = Number.isFinite(responseLimit) && responseLimit > 0 ? responseLimit : 10;
        this.total = Number.isFinite(responseTotal) && responseTotal >= 0 ? responseTotal : 0;
        this.totalPages =
          Number.isFinite(responseTotalPages) && responseTotalPages > 0 ? responseTotalPages : 1;
        this.hasNextPage = response.hasNextPage ?? this.page < this.totalPages;
        this.hasPrevPage = response.hasPrevPage ?? this.page > 1;
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

    if (!Number.isFinite(targetPage)) {
      return;
    }

    if (targetPage < 1 || targetPage > this.totalPages || targetPage === this.page) {
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm,
        page: targetPage,
      },
      queryParamsHandling: 'merge',
    });
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-fragrances',
  imports: [],
  templateUrl: './fragrances.html',
  styleUrl: './fragrances.css',
})
export class Fragrances implements OnInit {
  protected readonly categoryName = 'fragrances';
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.productService.getProductsByCategory(this.categoryName).subscribe((response) => {
      this.products = response.products;
      this.cdr.detectChanges();
    });
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-laptops',
  imports: [],
  templateUrl: './laptops.html',
  styleUrl: './laptops.css',
})
export class Laptops implements OnInit {
  protected readonly categoryName = 'laptops';
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


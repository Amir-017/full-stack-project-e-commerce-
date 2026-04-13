import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-sports-accessories',
  imports: [],
  templateUrl: './sports-accessories.html',
  styleUrl: './sports-accessories.css',
})
export class SportsAccessories implements OnInit {
  protected readonly categoryName = 'sports-accessories';
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


import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-womens-bags',
  imports: [],
  templateUrl: './womens-bags.html',
  styleUrl: './womens-bags.css',
})
export class WomensBags implements OnInit {
  protected readonly categoryName = 'womens-bags';
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


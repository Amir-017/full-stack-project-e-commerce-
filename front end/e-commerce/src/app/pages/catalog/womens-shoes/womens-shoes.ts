import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-womens-shoes',
  imports: [],
  templateUrl: './womens-shoes.html',
  styleUrl: './womens-shoes.css',
})
export class WomensShoes implements OnInit {
  protected readonly categoryName = 'womens-shoes';
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


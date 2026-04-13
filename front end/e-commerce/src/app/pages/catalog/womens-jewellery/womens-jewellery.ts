import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-womens-jewellery',
  imports: [],
  templateUrl: './womens-jewellery.html',
  styleUrl: './womens-jewellery.css',
})
export class WomensJewellery implements OnInit {
  protected readonly categoryName = 'womens-jewellery';
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


import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}
  products: Product[] = [];

  ngOnInit(): void {
    this.productService.getproducts().subscribe((response) => {
      this.products = response.products;
      this.cdr.detectChanges();
      console.log(this.products);
    });
  }
}

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart-service';
import { RouterLink } from "@angular/router";

interface ProductItem {
  product: {
    _id: string;
    title: string;
    price: number;
    thumbnail?: string;
    images?: string[];
    description:string
  };
  quantity: number;
  _id: string;
}

interface Cart {
  products: ProductItem[] | null | undefined;
  userName:
    | {
    name: string;
    email: string;
    role: string;
    _id: string;
      }
    | null;
}

@Component({
  selector: 'app-admin-carts',
  imports: [CommonModule, RouterLink],
  templateUrl: './carts.html',
  styleUrl: './carts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carts implements OnInit {
  cartService = inject(CartService);
  allCarts = signal<Cart[]>([]);
  isLoading = signal(true);
  requestError = signal('');

  ngOnInit(): void {
    this.cartService.getAllCarts().subscribe({
      next: (response) => {
        const carts = (response.data ?? []).filter(
          (cart) => (cart.products?.length ?? 0) > 0,
        ) as Cart[];

        this.allCarts.set(carts);
        this.isLoading.set(false);
        console.log(carts);

      },
      error: (err) => {
        this.requestError.set('Failed to load carts');
        this.isLoading.set(false);
      },
    });
  }
}

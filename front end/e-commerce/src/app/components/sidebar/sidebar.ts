import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  links = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Beauty', href: '/beauty', icon: 'palette' },
    { label: 'Fragrances', href: '/fragrances', icon: 'favorite' },
    { label: 'Furniture', href: '/furniture', icon: 'chair' },
    { label: 'Groceries', href: '/groceries', icon: 'shopping_basket' },
    { label: 'Home Decoration', href: '/home-decoration', icon: 'home_and_garden' },
    { label: 'Kitchen Accessories', href: '/kitchen-accessories', icon: 'kitchen' },
    { label: 'Laptops', href: '/laptops', icon: 'laptop' },
    { label: 'Mens Shirts', href: '/mens-shirts', icon: 'checkroom' },
    { label: 'Mens Shoes', href: '/mens-shoes', icon: 'shopping_bag' },
    { label: 'Mens Watches', href: '/mens-watches', icon: 'schedule' },
    { label: 'Mobile Accessories', href: '/mobile-accessories', icon: 'phone_iphone' },
    { label: 'Motorcycle', href: '/motorcycle', icon: 'two_wheeler' },
    { label: 'Skin Care', href: '/skin-care', icon: 'spa' },
    { label: 'Smartphones', href: '/smartphones', icon: 'smartphone' },
    { label: 'Sports Accessories', href: '/sports-accessories', icon: 'sports_soccer' },
    { label: 'Sunglasses', href: '/sunglasses', icon: 'dark_mode' },
    { label: 'Tablets', href: '/tablets', icon: 'tablet' },
    { label: 'Tops', href: '/tops', icon: 'checkroom' },
    { label: 'Vehicle', href: '/vehicle', icon: 'directions_car' },
    { label: 'Womens Bags', href: '/womens-bags', icon: 'shopping_bag' },
    { label: 'Womens Dresses', href: '/womens-dresses', icon: 'checkroom' },
    { label: 'Womens Jewellery', href: '/womens-jewellery', icon: 'diamond' },
    { label: 'Womens Shoes', href: '/womens-shoes', icon: 'shopping_bag' },
    { label: 'Womens Watches', href: '/womens-watches', icon: 'schedule' },
  ];

  onLinkClick(): void {
    this.closeMenu.emit();
  }

  onBackdropClick(): void {
    this.closeMenu.emit();
  }
}

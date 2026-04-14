import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Product } from '../../../../../models/product.model';
import { ProductService } from '../../../../../services/product-service';

@Component({
  selector: 'app-update-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit {
  productId = '';
  loading = false;
  submitting = false;
  submitError = '';
  submitSuccess = '';

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(15)]),
    brand: new FormControl('', [Validators.required, Validators.minLength(2)]),
    category: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    discountPercentage: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(99),
    ]),
    rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    inStock: new FormControl(true, [Validators.required]),
    images: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    if (!this.productId) {
      this.submitError = 'Product id is missing.';
      return;
    }

    this.loadProduct();
  }

  loadProduct(): void {
    // this.loading = true;
    this.submitError = '';

    this.productService
      .getProductById(this.productId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          const product = response.data as Product;

          this.productForm.setValue({
            title: product.title,
            description: product.description,
            brand: product.brand,
            category: product.category,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            inStock: product.inStock,
            images: (product.images ?? []).join(', '),
          });
        },
        error: (error) => {
          console.error('load product failed:', error);
          this.submitError = 'Failed to load product data.';
        },
      });
  }

  submit(): void {
    this.submitError = '';
    this.submitSuccess = '';

    if (!this.productId) {
      this.submitError = 'Product id is missing.';
      return;
    }

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.submitError = 'Please complete all required fields with valid values.';
      return;
    }

    const token = localStorage.getItem('accessToken') ?? '';
    if (!token) {
      this.submitError = 'Access token not found. Please login first.';
      return;
    }

    const rawImages = this.productForm.controls.images.value ?? '';
    const images = rawImages
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (images.length === 0) {
      this.submitError = 'At least one image URL is required.';
      return;
    }

    const payload: Partial<Product> = {
      title: (this.productForm.controls.title.value ?? '').trim(),
      description: (this.productForm.controls.description.value ?? '').trim(),
      brand: (this.productForm.controls.brand.value ?? '').trim(),
      category: (this.productForm.controls.category.value ?? '').trim(),
      price: Number(this.productForm.controls.price.value),
      discountPercentage: Number(this.productForm.controls.discountPercentage.value),
      rating: Number(this.productForm.controls.rating.value),
      stock: Number(this.productForm.controls.stock.value),
      inStock: Boolean(this.productForm.controls.inStock.value),
      images,
    };

    this.submitting = true;

    this.productService
      .updateProduct(this.productId, payload, token)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: (response) => {
          console.log('update product response:', response);
          this.submitSuccess = 'Product updated successfully.';
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('update product failed:', error);
          this.submitError = error?.error?.message ?? 'Failed to update product. Please try again.';
        },
      });
  }

  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}

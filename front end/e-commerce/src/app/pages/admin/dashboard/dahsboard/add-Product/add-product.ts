import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CreateProductRequest } from '../../../../../models/product.model';
import { ProductService } from '../../../../../services/product-service';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
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
    private productService: ProductService,
    private router: Router,
  ) {}

  submit(): void {
    this.submitError = '';
    this.submitSuccess = '';

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

    const payload: CreateProductRequest = {
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
      .addProduct(payload, token)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: (response) => {
          console.log('add product response:', response);
          this.submitSuccess = 'Product added successfully.';
          this.productForm.reset({
            title: '',
            description: '',
            brand: '',
            category: '',
            price: 0,
            discountPercentage: 0,
            rating: 0,
            stock: 0,
            inStock: true,
            images: '',
          });
              this.router.navigate(['/admin/dashboard']);

        },
        error: (error) => {
          console.error('add product failed:', error);
          this.submitError = error?.error?.message ?? 'Failed to add product. Please try again.';
        },
      });
  }

  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}

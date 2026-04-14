export interface Product {
  _id: string;
  id?: number;
  brand: string;
  category: string;
  createdAt: string;
  description: string;
  discountPercentage: number;
  images: string[];
  inStock: boolean;
  price: number;
  rating: number;
  stock: number;
  title: string;
  updatedAt: string;
  __v: number;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
  inStock: boolean;
}

export interface ApiResponse {
  products: Product[];
}

export interface DashboardProductsResponse {
  page: number;
  limit: number;
  total: number;
  products: Product[];
}

export interface ProductDetailsResponse {
  data: Product;
}

export interface SearchProductsResponse extends DashboardProductsResponse {
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

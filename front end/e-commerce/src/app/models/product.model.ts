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
}

export interface ApiResponse {
  products: Product[];
  // total: number;
}

export interface ProductDetailsResponse {
  data: Product;
}

export interface SearchProductsResponse {
  products: Product[];
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface ProductResponse {
  success: boolean;
  products: Product[];
  totalPages: number;
  currentPage: number;
}

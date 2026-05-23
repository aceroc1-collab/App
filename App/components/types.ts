export interface Product {
  id: number;
  name: string;
  presentation: string;
  price: number;
  category: string;
}

export interface CartItem extends Product {
  qty: number;
}

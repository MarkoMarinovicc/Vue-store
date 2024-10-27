
export interface Product {
  id: string; 
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export interface CartItem {
  id?:string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  errorMsg:String,
  successMsg:String,
}

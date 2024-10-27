import { defineStore } from 'pinia';
import { getData, postData, updateData, deleteData } from '@/services/apiService';
import type { CartState, Product, CartItem } from '@/types/cartTypes';

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cartItems: [],
    errorMsg: '',
    successMsg: '',
  }),

  getters: {
    totalQuantity: (state): number => {
      return state.cartItems.length;
    },

    totalValue: (state): number => {
      return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },

  actions: {


    async updateCartItem(item: CartItem) {
      if (!item.id) {
        console.error('Item must have an id to update.');
        return;
      }

      try {
        await updateData(`cart/${item.id}`, item);
      } catch (error) {
        this.errorMsg = 'Failed to update cart item';
      } finally {
        this.successMsg = 'Successfully updated cart';
      }
    },

    async fetchCartItems() {
      try {
        const data = await getData('cart');
        this.cartItems = data;
      } catch (error) {
        this.errorMsg = 'Failed to fetch cart items';
      } 
    },

    async addToCart(product: Product, quantity: number) {
      const itemInCart = this.cartItems.find((cartItem) => cartItem.name === product.name);

      if (itemInCart) {
        const newQuantity = itemInCart.quantity + quantity;
        itemInCart.quantity = newQuantity;
        await this.updateCartItem(itemInCart);
      } else {
        if (quantity > 5) {
          console.error('Cannot add more than 5 of the same product at once');
          return;
        }

        const newItem: CartItem = {
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          quantity,
        };

        this.cartItems.push(newItem);

        try {
          await postData('cart', newItem);
          const data = await getData('cart');
          this.cartItems = data;
        } catch (error) {
          this.errorMsg = 'Failed to add item to cart';
        } finally {
          this.successMsg = 'Successfully added item to cart';
        }
      }
    },

    async removeCartItem(item: CartItem) {
      if (!item.id) {
        this.errorMsg = 'Item must have an id to remove.';
        return;
      }

      try {
        await deleteData(`cart/${item.id}`);
        this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
      } catch (error) {
        this.errorMsg = 'Failed to remove item from cart';
      } finally {
        this.successMsg = `Successfully deleted`;
      }
    },

    async resetCart() {
      if (this.cartItems.length === 0) {
        this.errorMsg = 'Cart is already empty';
        return;
      }
    
      try {
        for (const item of this.cartItems) {
          if (item.id) {
            await this.removeCartItem(item);
          }
        }
        this.cartItems = [];
        this.successMsg = 'Successfully emptied the cart';
      } catch (error) {
        this.errorMsg = 'Failed to reset cart';
      } finally {
        this.successMsg = 'Cart has been cleared';
      }
    },
    
  },
});

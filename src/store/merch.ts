// src/stores/merchStore.ts
import { defineStore } from 'pinia';
import { getData } from '@/services/apiService';
import type { Product } from '@/types/cartTypes';

export const useMerchStore = defineStore('merch', {
  state: () => ({
    products: [] as Product[],
    singleProduct: null as Product | null,
  }),

  actions: {
    async fetchMerch() {
      try {
        const data = await getData('merch');
        this.products = data;
      } catch (error) {
        console.error('Failed to fetch merch products', error);
      }
    },

    async fetchSingleMerch(id: string) {
      try {
        const data = await getData(`merch/${id}`);
        this.singleProduct = data;
      } catch (error) {
        console.error('Failed to fetch single product', error);
      }
    },
  },
});

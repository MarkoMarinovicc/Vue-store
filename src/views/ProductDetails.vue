<template>
  <div :class="['merch-wrapper', theme]">
    <h1 style="margin: 3% 0%">Merch Products</h1>
    <div class="products-grid">
      <div
        v-for="product in merchStore.products"
        :key="product.id"
        class="product"
        @click="goToProduct(product.id)"
      >
        <img :src="product.image ? product.image : imgPlaceholder" :alt="product.name" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useMerchStore } from '@/store/merch'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/store/theme'
import imgPlaceholder from '@/assets/images/product-svgrepo-com.svg'

export default defineComponent({
  setup() {
    const merchStore = useMerchStore()
    const cartStore = useCartStore()
    const themeStore = useThemeStore()
    const router = useRouter()

    onMounted(async () => {
      await merchStore.fetchMerch()
      await cartStore.fetchCartItems()
    })

    const goToProduct = (id: string) => {
      router.push(`/product/${id}`)
    }

    return {
      merchStore,
      cartStore,
      goToProduct,
      imgPlaceholder,
      theme: themeStore.theme
    }
  }
})
</script>

<style scoped lang="scss">
.merch-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0% 8%;
  padding-bottom: 1%;
  transition:
    background-color 0.3s,
    color 0.3s; 
}



.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

.product {
  border: 1px solid #ccc;
  padding: 10px;
  background: inherit; 
  text-align: center;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s; 
}

img {
  max-width: 50%;
  height: auto;
  background-color: white;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #5cb85c;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #4cae4c;
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>

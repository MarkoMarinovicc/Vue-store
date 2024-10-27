<template>
  <div class="product-details-wrapper">
    <div class="width-adjustment" >
      <div class="single-product-wrapper" v-if="product">
        <div class="breadcrumps">
          <span>Home ></span> <span>Shop ></span> <span>Fashion ></span> <span>Product</span>
        </div>
        <div class="product">
          <h2>{{ product.name }}</h2>
          <p class="small-description">
            Black Bella Canvas, T-Shirt, Male Model, Lifestyle Outdoor.
          </p>
          <div class="price">
            <p>${{ product.price }}</p>
            <span> $39.00</span>
          </div>
          <div style="display: flex; gap: 10px">
            <img :src="product.image ? product.image : imgPlaceholder" :alt="product.name" />
            <img :src="imgPlaceholder" alt="Pic1" />
            <img :src="imgPlaceholder" alt="Pic1" />
          </div>

          <div class="description">
            <span>Description</span>
            <p>{{ product.description }}</p>
          </div>

          <button @click="addToCart(product, quantity)">Add to Cart</button>
        </div>
      </div>
      <div v-else>
        <p>Loading product...</p>
      </div>
    </div>
    <div class="devider"></div>
    <Cart />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMerchStore } from '@/store/merch'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/types/cartTypes'
import imgPlaceholder from '@/assets/images/product-svgrepo-com.svg'
import { useThemeStore } from '@/store/theme'
import Cart from './Cart.vue'

export default defineComponent({
  components: { Cart },
  setup() {
    const route = useRoute()
    const merchStore = useMerchStore()
    const cartStore = useCartStore()
    const themeStore = useThemeStore()

    const product = ref<Product | null>(null)
    const quantity = ref(1)

    onMounted(async () => {
      const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
      await cartStore.fetchCartItems()

      await merchStore.fetchSingleMerch(id as string)
      product.value = merchStore.singleProduct
    })

    const addToCart = async (product: any, quantity: number) => {
  const existingItem = cartStore.cartItems.find((item) => item.name === product.name);
  
  if (existingItem) {
    if (existingItem.quantity + quantity <= 5) {
      existingItem.quantity += quantity;
      await cartStore.updateCartItem(existingItem);
    } else {
      alert('You cannot add more than 5 of this item.');
    }
  } else {
    if (quantity <= 5) {
      await cartStore.addToCart(product, quantity);
    } else {
      alert('You cannot add more than 5 of this item.');
    }
  }
};


    return {
      product,
      quantity,
      cartStore,
      addToCart,
      imgPlaceholder
    }
  }
})
</script>

<style scoped lang="scss">
.width-adjustment{
    width: 63.5%;
    @media (max-width: 768px) {
        width: 100%;

  }
}
.product-details-wrapper {
  display: flex;
  flex-direction: row;
  padding: 0% 8%;
  padding-top: 40px;
  min-height: 93vh;
  justify-content: space-between;

  // Stack elements vertically on smaller screens
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
}

.single-product-wrapper {
  display: flex;
  flex-direction: column;
  padding-bottom: 1%;
}

.breadcrumps {
  padding-bottom: 40px;
}

.product {
  display: flex;
  flex-direction: column;
  
  img {
    width: 30%;
  }

  h2 {
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -0.4000000059604645px;
  }

  .small-description {
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    color: #6c7275;
  }

  .price {
    display: flex;
    gap: 10px;
    font-family: Poppins;

    p {
      font-size: 28px;
      font-weight: 600;
      line-height: 34px;
      letter-spacing: -0.6000000238418579px;
    }

    span {
      text-decoration: line-through;
      font-size: 20px;
      font-weight: 300;
      line-height: 28px;
      color: #6c7275;
      align-self: center;
    }
  }

  .product-images {
    display: flex;
    gap: 10px;

    // Stack images vertically on small screens
    @media (max-width: 768px) {
      flex-direction: column;
    }

    img {
      width: 100%; // Images take full width in responsive mode
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    color: #6c7275;
    font-family: Inter;

    span {
      font-size: 16px;
      font-weight: 600;
    }

    p {
      font-size: 16px;
      font-weight: 400;
    }
  }
}

.devider {
  width: 1px;
  background-color: #d9d9d9;

  // Hide divider on small screens
  @media (max-width: 768px) {
    display: none;
  }
}

.error-message {
  color: red;
  margin: 10px 0;
}

.success-message {
  color: green;
  margin: 10px 0;
}

img {
  max-width: 100%;
  height: auto;
}

.quantity-controls {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

button {
  margin-top: 15px;
  padding: 10px 15px;
  margin: 0 5px;
  max-width: 500px;
  min-width: 500px;
  align-self: center;
  background-color: black;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: Inter;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: -0.4000000059604645px;

  &:hover {
    background-color: black;
    opacity: 60%;
  }

  // Full width button on small screens
  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 100%;
  }
}

span {
  font-size: 1.2em;
  margin: 0 10px;
}

</style>

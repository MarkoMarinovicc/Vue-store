<template>
  <div class="shopping-cart">
    <h1>Your Shopping Cart</h1>
    <div class="cart-item" v-for="item in cartStore.cartItems" :key="item.name">
      <div class="content">
        <img
          :src="item.image ? item.image : imgPlaceholder"
          :alt="item.name"
          style="width: 80px; height: 96px"
        />
        <div class="name-desc-wrapper">
          <p>{{ item.name }}</p>
          <p>{{ item.description }}</p>
          <div class="quantity-controls">
            <button
              style="margin-right: 10px"
              @click="decreaseQuantity(item)"
              :disabled="item.quantity === 1"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button
              style="margin-left: 10px"
              @click="increaseQuantity(item)"
              :disabled="item.quantity === 5"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <p>${{ item.price * item.quantity }}</p>
          <img :src="trash" alt="Trash" @click="removeFromCart(item)" />
        </div>
      </div>

      <div class="divider-cart"></div>
    </div>

    <div class="shipping">
      <span>Shipping</span>
      <p>
        Experience seamless shopping with a bonus: Spend over $150 and unlock free global shipping,
        saving you the standard $30 shipping fee!
      </p>
    </div>
    <div class="shipping-cost" style="display: flex; justify-content: space-between">
      <span>Shipping Cost: </span> <span>${{ total < 150 ? 30 : 0 }}</span>
    </div>
    <div class="shpping-app">
      <span>ShoppingApp Peace of Mind</span>
      <p>
        Shop confidently on ShoppingApp knowing if something goes wrong with an order, we've got
        your back for all eligible purchases.
      </p>
    </div>
    <p v-if="cartStore.cartItems.length === 0">Your cart is empty.</p>
    <div
      v-else
      class="final-steps"
    >
      <div class="shipping-cost" style="display: flex; justify-content: space-between">
        <span>Total: </span> <span>${{ total }}</span>
      </div>
      <button class="checkout">Checkout</button>
      <span style="cursor: pointer;" class="reset" @click="resetCart">Reset Cart</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useCartStore } from '@/store/cart'
import type { CartItem } from '@/types/cartTypes'
import imgPlaceholder from '@/assets/images/product-svgrepo-com.svg'
import trash from '@/assets/images/Trash.svg'

export default defineComponent({
  setup() {
    const cartStore = useCartStore()

    onMounted(async () => {
      await cartStore.fetchCartItems()
    })

    const updateQuantity = async (item: CartItem) => {
      await cartStore.updateCartItem(item)
    }

    const increaseQuantity = (item: CartItem) => {
      if (item.quantity < 5) {
        item.quantity += 1
        updateQuantity(item) //
      }
    }

    const decreaseQuantity = (item: CartItem) => {
      if (item.quantity > 1) {
        item.quantity -= 1
        updateQuantity(item)
      }
    }

    const removeFromCart = async (item: CartItem) => {
      await cartStore.removeCartItem(item)
    }

    const resetCart = async () => {
      await cartStore.resetCart()
    }

    const total = computed(() =>
      cartStore.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
    )

    return {
      cartStore,
      total,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      resetCart,
      imgPlaceholder,
      trash
    }
  }
})
</script>

<style scoped lang="scss">
.shopping-cart {
  display: flex;
  flex-direction: column;
  width: 45%;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    align-items: unset;
  }
  h1 {
    font-family: Poppins;
    font-size: 28px;
    font-weight: 500;
    letter-spacing: -0.6000000238418579px;
  }
}
.cart-item {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 10px;
  @media (max-width: 768px) {
    padding: 10px 0px;
    gap: 10px;

  }
  .content {
    display: flex;
    gap: 30px;
    @media (max-width: 768px) {
    gap: 10px;

  }
    .name-desc-wrapper {
      font-family: Inter;
      min-width: 200px;
      :nth-child(1) {
        font-size: 14px;
        font-weight: 600;
      }
      :nth-child(2) {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}
.divider-cart {
  width: 100%;
  height: 1px;
  background-color: #e8ecef;
}
.shipping,
.shipping-cost,
.shpping-app {
  max-width: 400px;
  min-width: 400px;
  margin: 10px 0px;
  @media (max-width: 768px) {
    max-width: 360px;
    min-width: 360px;

  }
  span {
    font-family: Inter;
    font-size: 12px;
    font-weight: 700;
  }
  p {
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;

    color: #6c7275;
  }
}
.checkout {
  max-width: 400px;
  min-width: 400px;
  background-color: #207db1;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 15px 15px;
  margin: 20px 0px;
  font-family: Inter;
  font-size: 18px;
  font-weight: 500;
  @media (max-width: 768px) {
    max-width: unset;
    min-width: unset;

    padding: 15px 0px;

  }
}
.reset {
  text-decoration: underline;
  font-family: Inter;
  font-size: 14px;
  font-weight: 200;
  @media (max-width: 768px) {
  align-self: center;

  }
}
.final-steps{
margin-top: 25px; 
display: flex; 
flex-direction: column; 
align-items: center;
@media (max-width: 768px) {
  align-items: unset;

  }
}
button {
  padding: 5px 10px;
  color: black;
  border: none;
  cursor: pointer;
  border: 1px solid black;
}
</style>

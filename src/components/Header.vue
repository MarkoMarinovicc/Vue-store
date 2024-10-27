<template>
  <header :class="{ dark: isDarkTheme, light: !isDarkTheme }">
    <div @click="goToRoute('/')" class="header-title">ShoppingApp</div>
    <div>
      <ul class="header-list">
        <li v-for="item in navItems" :key="item.label" @click="goToRoute(item.route)">
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="icon-wrapper">
      <img :src="searchIcon" alt="" />
      <img :src="userIcon" alt="" />
      <div class="cart-wrapper" @click="goToCart">
        <img :src="storeIcon" alt="" />
        <div class="quantity-wrapper">
          <span>{{ totalQuantity }}</span>
        </div>
      </div>
      <button @click="toggleTheme">
        {{ isDarkTheme ? 'Light theme' : 'Dark theme' }}
      </button>
    </div>
  </header>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useThemeStore } from '@/store/theme'
import { useCartStore } from '@/store/cart'
import searchIcon from '@/assets/images/search.svg'
import storeIcon from '@/assets/images/Store.svg'
import userIcon from '@/assets/images/User.svg'
import { useRouter } from 'vue-router'
import { navItems } from '@/constants/constants'

export default defineComponent({
  setup() {
    const themeStore = useThemeStore()
    const cartStore = useCartStore()
    const router = useRouter()

    const isDarkTheme = computed(() => themeStore.theme === 'dark')
    onMounted(async () => {
      await cartStore.fetchCartItems()
    })
    const toggleTheme = () => {
      themeStore.toggleTheme()
    }

    const totalQuantity = computed(() => cartStore.totalQuantity)

    const goToCart = () => {
      router.push('/cart')
    }

    const goToRoute = (route) => {
      router.push(route)
    }

    return {
      isDarkTheme,
      toggleTheme,
      searchIcon,
      storeIcon,
      userIcon,
      totalQuantity,
      goToCart,
      navItems,
      goToRoute
    }
  }
})
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  padding: 0.3% 8%;
  align-items: center;
  transition: background-color 0.3s;
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.dark {
  background-color: #333;
  color: #fff;
}

.light {
  background-color: #f9f9f9;
  color: #333;
}
.header-list {
  display: flex;
  gap: 20px;
  cursor: pointer;
}
.icon-wrapper {
  display: flex;
  gap: 20px;
  img {
    width: 20px;
    cursor: pointer;
  }
  .cart-wrapper {
    display: flex;
    gap: 20px;
    align-items: center;
    cursor: pointer;
    .quantity-wrapper {
      background-color: #f178b6;
      padding: 2px 7px;
      border-radius: 50%;
    }
  }
}
.header-title {
  cursor: pointer;
  font-size: 24px;
  font-weight: 500;
  @media (max-width: 768px) {
    display: none;
  }
}
button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

button:hover {
  background-color: #f178b6;
  color: #fff;
}
</style>

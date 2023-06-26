<script setup>
import { ref } from 'vue';
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";

const shop = useShopStore();
const addedToCart = ref(false);

const handleAddToCart = () => {
  addedToCart.value = true;
  setTimeout(() => {
    addedToCart.value = false;
  }, 2000);
};
</script>


<template>
  <div>
    <h2 class="text-2xl">Shopping Cart</h2>

    <div v-if="shop.cartQuantity > 0" class="flex flex-col lg:flex-row lg:gap-6">
      <div class="divide-y divide-gray-300 lg:w-2/3">
        <div v-for="item in shop.cart" :key="item.id" class="py-6 flex gap-4">
          <img class="w-48 h-48 bg-beige rounded-md" :src="item.photo" />
          <div class="flex justify-between w-full">
            <div class="w-9">
              <div class="text-xl font-bold text-blue-800">{{ item.title }}</div>
              <div class="text-lg text-gray-700">${{ item.price / 100 }}</div>
            </div>

            <div>
              <select class="bg-white border border-gray-300 rounded px-4 py-2" v-model.number="item.quantity">
                <option v-for="i in item.quantity > 10 ? item.quantity : 10" :key="i">
                  {{ i }}
                </option>
              </select>
            </div>

            <div>
              <XMarkIcon class="w-8 h-8 text-red-500 hover:text-red-700 cursor-pointer" @click="shop.removeItem(item)" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 rounded-md p-6 lg:w-1/3 flex flex-col gap-6">
        <h3 class="text-lg">Order summary</h3>

        <div class="divide-y divide-gray-300">
          <div class="py-3 flex justify-between">
            <div>Subtotal</div>
            <div>${{ shop.cartSubtotal / 100 }}</div>
          </div>

          <div class="py-3 flex justify-between">
            <div>Shipping</div>
            <div>${{ shop.cartShipping / 100 }}</div>
          </div>

          <div class="py-3 flex justify-between">
            <div>Tax</div>
            <div>${{ (shop.cartTax / 100).toFixed(2) }}</div>
          </div>

          <div class="py-3 flex justify-between font-bold">
            <div>Order total</div>
            <div>${{ (shop.cartTotal / 100).toFixed(2) }}</div>
          </div>
        </div>

        <button class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3 w-full relative"
          @click="handleAddToCart">
          <span v-if="addedToCart" class="absolute inset-0 flex items-center justify-center">
            <CheckIcon class="w-6 h-6 animate-tick" />
          </span>
          <span v-else>Buy</span>
        </button>
      </div>
    </div>

    <div v-else class="mt-10">
      Nothing here, yet!
    </div>

  </div>
</template>

<style>
@keyframes tick {
  0% {
    stroke-dashoffset: 24;
    stroke-dasharray: 0 24;
  }

  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 24 24;
  }
}

.animate-tick {
  animation: tick 0.8s ease-in-out;
}
</style>

<template>
  <div v-if="item" class="flex flex-col md:flex-row gap-6">
    <div class="h-full w-full md:w-1/2 flex items-center justify-center overflow-hidden rounded-lg shadow-md p-4">
      <img class="rounded-xl bg-beige" :src="item.image" />
    </div>

    <div class="flex flex-col gap-6 md:gap-8 w-full md:w-1/2 items-center justify-center">
      <div class="flex flex-col gap-2 text-center">
        <h2 class="text-3xl md:text-4xl font-semibold text-gray-800">{{ item.title }}</h2>

        <div class="text-3xl md:text-4xl text-green-500 font-bold">${{ item.price / 100 }}</div>

        <div class="text-gray-600 text-sm md:text-base">{{ item.description }}</div>
      </div>

      <button class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3"
        @click="addToCart">
        Add to cart
      </button>
    </div>
  </div>
  <hr v-if="item" class="my-6 border-gray-300" />
  <!-- Wrap the reviews section in a new div element -->
  <div v-if="item && item.reviews.length > 0" class="w-full mt-6">
    <!-- Align the Reviews text to the left with some margin -->
    <h3 class="text-lg font-semibold mb-4 text-left ml-4">Reviews</h3>
    <ul class="flex flex-wrap gap-4">
      <!-- Add padding and border styles to the li element -->
      <li v-for="(review, index) in item.reviews" :key="index"
        class="w-full md:w-auto flex-grow rounded-lg shadow-md p-4 border border-gray-300 py-6 px-8">
        <div class="flex items-center gap-2 mb-2">
          <img :src="review.avatar" alt="" class="w-8 h-8 rounded-full" />
          <span class="font-bold">{{ review.nickname }}</span>
        </div>
        <div><span class="font-bold">Rating:</span> {{ review.stars }}/5</div>
        <p>{{ review.text }}</p>
        <!-- Reduce the size of images within the reviews -->
        <img v-if="review.image" :src="review.image" alt="" class="w-full rounded-lg mt-2 max-w-xs" />
      </li>
    </ul>
  </div>
  <!-- Add an else block to display a message when there are no reviews -->
  <div v-if="item && item.reviews.length === 0" class="w-full mt-6">
    <p>No reviews yet.</p>
  </div>
</template>



<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, ref, computed } from "vue";

const route = useRoute();
const products = ref([]);

async function fetchProducts() {
  try {
    const response = await axios.get("http://localhost:3001/api/product/");
    products.value = response.data;
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  fetchProducts();
});

const item = computed(() => {
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i]._id === route.params.id) {
      return products.value[i];
    }
  }
  return null;
});

async function addToCart() {
  try {
    await axios.post("http://localhost:3001/api/cart/", { productId: item.value._id, quantity: 1 });
    alert("Product added to cart");
  } catch (err) {
    console.log(err);
    alert("Error adding product to cart");
  }
}
</script>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
<template>
  <div class="flex background flex-col items-center">
    <div class="flex gap-4 my-4">
      <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="generateProduct">
        Generate Product
      </button>
      <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="ViewApi">
        See Api
      </button>
      <button class="bg-red-500 text-white px-4 py-2 rounded" @click="deleteAllProducts">
        Delete All Products
      </button>
    </div>
    <div class="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 justify-items-center
      ">
      <RouterLink class="w-56 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-4 relative" v-for="product in products"
        :to="`/item/${product._id}`" :key="product._id" @change="openModal(product)">
        <img class="rounded-md bg-beige" :src="product.image" alt="Product Image" />
        <div class="flex justify-between">
          <div class="text-gray-800 font-bold">{{ product.prodname }}</div>
          <div class="text-green-500 font-bold">${{ product.price }}</div>
        </div>
        <div class="flex gap-1">
          <star-rating :rating="calculateAverageRating(product.reviews)" />
          <span class="text-sm text-gray-600">
            {{ calculateAverageRating(product.reviews).toFixed(1) }}
          </span>
          <span v-if="product.reviews.length > 0" class="
              bg-blue-500 text-white rounded-full px-2 py-1 text-xs ml-auto
            ">
            {{ product.reviews.length }}
          </span>
        </div>
      </RouterLink>
    </div>
    <div v-if="selectedProduct" class="
        fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50
      ">
      <div class="
          bg-white p-4 rounded-lg shadow-lg max-w-md w-full overflow-y-auto max-h-[80%]
        ">
        <img class="rounded-md mb-4 w-full h-64 object-cover object-center" :src="selectedProduct.image"
          alt="Product Image" />
        <h2 class="text-xl font-bold mb-2">{{ selectedProduct.prodname }}</h2>
        <p>{{ selectedProduct.description }}</p>
        <h3 class="text-lg font-bold mt-4 mb-2">Overall Rating:</h3>
        <star-rating :rating="calculateAverageRating(selectedProduct.reviews)" />
        <span class="text-sm text-gray-600 ml-2">
          {{ calculateAverageRating(selectedProduct.reviews).toFixed(1) }}
        </span>
        <h3 class="text-lg font-bold mt-4 mb-2">Reviews:</h3>
        <ul class="">
          <li v-for="(review, index) in selectedProduct.reviews" :key="index">
            <div class="flex items-center gap-2 mb-2">
              <img class="w-8 h-8 rounded-full" :src="review.avatar" alt="Reviewer Avatar" />
              <div class="">
                <div class="font-bold">{{ review.nickname }}</div>
                <star-rating :rating="review.stars" />
              </div>
            </div>
            <p>{{ review.text }}</p>
          </li>
        </ul>

        <div class="flex justify-end mt-4">
          <button class="bg-red-500 text-white px-4 py-2 rounded mr-2" @click="deleteProduct(selectedProduct)">
            Delete Product
          </button>
          <button class="px-4 py-2 rounded" @click="selectedProduct = null">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Working without backend -->
  <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 justify-items-center">
    <RouterLink
      class="w-56 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-4"
      v-for="item in shop.forSale"
      :to="`/item/${item.id}`"
      :key="item.id"
    >
      <img
        class="rounded-md bg-beige"
        :src="item.photo"
        alt="280 by 320 pixel placeholder"
      />
      <div class="flex justify-between">
        <div class="text-gray-800 font-bold">{{ item.title }}</div>
        <div class="text-green-500 font-bold">${{ item.price / 100 }}</div>
      </div>
    </RouterLink>
  </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import dayjs from "dayjs";

const products = ref([]);
const selectedProduct = ref(null);


async function ViewApi() {
  try {
    window.location.href = 'http://localhost:3001/api/product';
  } catch (err) {
    console.log(err);
  }
}


async function fetchProducts() {
  try {
    const response = await axios.get("http://localhost:3001/api/product/");
    products.value = response.data;
  } catch (err) {
    console.log(err);
  }
}

onMounted(fetchProducts);

async function generateProduct() {
  try {
    const newProduct = {
      prodname: "New Product",
      price: 20.99,
      image: "https://example.com/new-product.jpg",
      description: "This is a new product",
      reviews: [],
      createdAt: dayjs().toISOString(),
    };
    const response = await axios.post(
      "http://localhost:3001/api/product",
      newProduct
    );
    products.value.push(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function deleteProduct(product) {
  try {
    await axios.delete(`http://localhost:3001/api/product/${product._id}`);
    products.value = products.value.filter((p) => p._id !== product._id);
    selectedProduct.value = null;
  } catch (err) {
    console.log(err);
  }
}

async function deleteAllProducts() {
  try {
    await axios.delete("http://localhost:3001/api/product");
    products.value = [];
    selectedProduct.value = null;
  } catch (err) {
    console.log(err);
  }
}

function calculateAverageRating(reviews) {
  if (reviews.length === 0) {
    return 0;
  }
  const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
  return totalStars / reviews.length;
}

function openModal(product) {
  selectedProduct.value = product;
}
</script>

<style>
.background {
  background-image: url('../assets/oooscillate.svg');
  background-size: cover;
  background-position: center;
  height: 100vh;
}</style>
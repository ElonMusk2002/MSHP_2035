<template>
  <div>
    <div v-if="showIntro" class="bg-gray-100 p-10 text-center rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold mb-4 text-blue-600">Welcome to AloExpress</h1>
      <p class="text-lg mb-6 text-gray-700">
        AloExpress is your one-stop shop for all your shopping needs. Whether you're looking for clothing, electronics, or
        home decor, we've got you covered.
      </p>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2" data-aos="fade-right">
          <img
            src="https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%2"
            alt="AloExpress" class="w-full h-full object-cover" loading="lazy">
        </div>
        <div class="w-full md:w-1/2 p-6" data-aos="fade-left">
          <h2 class="text-3xl font-bold mb-4 text-blue-600">Why Choose AloExpress?</h2>
          <p class="text-lg mb-6 text-gray-700">
            AloExpress offers a wide range of products from top brands, ensuring quality and satisfaction. Our
            user-friendly interface and secure payment options make shopping a breeze.
          </p>
        </div>
      </div>
      <div class="mt-10 flex flex-wrap flex-row-reverse">
        <div class="w-full md:w-1/2" data-aos="fade-left">
          <img
            src="https://images.unsplash.com/photo-1515598379512-b60132823a9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="AloExpress" class="w-full h-full object-cover" loading="lazy">
        </div>
        <div class="w-full md:w-1/2 p-6" data-aos="fade-right">
          <h2 class="text-3xl font-bold mb-4 text-blue-600">What is AloExpress All About?</h2>
          <p class="text-lg mb-6 text-gray-700">
            AloExpress aims to revolutionize the way people shop by providing a seamless online shopping experience. Our
            platform connects buyers and sellers, offering a vast selection of products at competitive prices.
          </p>
        </div>
      </div>
      <div class="mt-10 flex flex-wrap">
        <div class="w-full md:w-1/2" data-aos="fade-right">
          <img
            src="https://images.unsplash.com/photo-1579846703786-afbf4b377f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
            alt="AloExpress" class="w-full h-full object-cover" loading="lazy">
        </div>
        <div class="w-full md:w-1/2 p-6" data-aos="fade-left">
          <h2 class="text-3xl font-bold mb-4 text-blue-600">Features of AloExpress</h2>
          <ul class="list-disc list-inside text-lg text-gray-700">
            <li>Fast and reliable delivery</li>
            <li>Secure payment options</li>
            <li>24/7 customer support</li>
          </ul>
        </div>
      </div>

      <button @click="showIntro = false"
        class="bg-blue-500 text-white px-4 py-2 mt-6 rounded hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105">Let's
        go</button>
    </div>

    <div v-else>
      <SiteHeader />
      <div class="container mx-auto p-5 md:p-10 flex flex-col gap-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

const showIntro = ref(true);


onMounted(() => {
  AOS.init();
});

</script>
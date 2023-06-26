<template>
  <div>
    <div
      class="flex justify-between items-center stripe bg-gradient-to-r from-blue-500 via-cyan-400 to-green-300 p-4 shadow-lg"
      style="width: 100%; padding: 20px;">
      <button class="text-3xl font-bold tracking-tight text-white" @click="goToHomePage">AloExpress</button>
      <button class="flex items-center ml-4 text-white hover:text-gray-200" @click="goToCartPage">
        <span class="relative">
          <ShoppingBagIcon class="h-6 w-6" />
          <span class="animate-ping absolute -top-1.5 -right-2 h-2 w-2 rounded-full bg-red-500 opacity-75"></span>
          <span v-if="shop.cartQuantity > 0"
            class="absolute -top-1 -right-1 h-4 w-4 rounded-full text-white font-bold text-sm flex items-center justify-center bg-red-500">{{
              shop.cartQuantity }}</span>
        </span>
      </button>
      <button v-if="!userPhoto" class="flex items-center ml-4 text-white hover:text-gray-200" @click="loginWithGoogle">
        Login with Google
      </button>
      <div v-else class="flex items-center ml-4">
        <img v-if="userPhoto" :src="userPhoto" alt="User Photo" class="h-8 w-8 rounded-full">
        <span v-if="userName" class="text-white ml-2 mr-2">{{ userName }}</span>
        <button class="text-white hover:text-gray-200" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ShoppingBagIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";
import { useRouter } from "vue-router";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';

const shop = useShopStore();
const router = useRouter();

const firebaseConfig = {
  apiKey: "AIzaSyD93-VrHcnVjYCWeVUrACbOi79aY6ksvY0",
  authDomain: "aloexpres-10b91.firebaseapp.com",
  databaseURL: "https://aloexpres-10b91-default-rtdb.firebaseio.com",
  projectId: "aloexpres-10b91",
  storageBucket: "aloexpres-10b91.appspot.com",
  messagingSenderId: "716040426793",
  appId: "1:716040426793:web:8f46edf2b4166e197a9338"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let userPhoto = ref('');
let userName = ref('');

const goToHomePage = () => {
  router.push("/");
};

const goToCartPage = () => {
  router.push("/cart");
};

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userPhoto.value = user.photoURL;
      userName.value = user.displayName;
    } else {
      userPhoto.value = null;
      userName.value = null;
    }
  });
});

const logout = () => {
  signOut(auth);
};
</script>

<template>
  
  <div>
    <div
      class="flex justify-between items-center stripe bg-gradient-to-r from-blue-500 via-cyan-400 to-green-300 p-4 shadow-lg"
      style="width: 100%; padding: 20px;">
      <button class="text-3xl font-bold tracking-tight text-white" @click="goToHomePage">AloExpress</button>
      <button class="flex items-center ml-4 text-white hover:text-gray-200" @click="goToCartPage">
        <span class="relative">
          <ShoppingBagIcon class="h-6 w-6" />
          <span v-if="cartQuantity > 0"
            class="absolute -top-1 -right-1 h-4 w-4 rounded-full text-white font-bold text-sm flex items-center justify-center bg-red-500">{{
              cartQuantity }}</span>
        </span>
      </button>
    <button
      v-if="!userPhoto"
      class="flex items-center ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      @click="loginWithGoogle"
    >
      <img
        class="h-5 w-5 mr-2"
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google Logo"
      />
      Login with Google
    </button>
      <div v-else class="flex items-center ml-4">
        <img v-if="userPhoto" :src="userPhoto" alt="User Photo" class="h-12 w-12 rounded-full">
        <span v-if="userName" class="text-white ml-2 mr-2">{{ userName }}</span>
        <button class="transition-background inline-flex h-10 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-r from-slate-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-black duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" @click="logout">Logout</button>
      </div>
    </div>
  </div>
  <div class="fixed inset-x-0 bottom-0 p-4">
  <div class="rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg">
    <p class="text-center text-sm font-medium">
      Love AloExpress?
      <a href="https://github.com/ElonMusk2002/MSHP_2035" class="inline-block underline">
        Check out this repo!
      </a>
    </p>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ShoppingBagIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';

const cartQuantity = ref(0);
const router = useRouter();

async function fetchCartQuantity() {
  try {
    const response = await axios.get("http://localhost:3001/api/cart/item");
    cartQuantity.value = response.data.totalQuantity;
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  fetchCartQuantity();
});

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
  router.push("/shop");
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

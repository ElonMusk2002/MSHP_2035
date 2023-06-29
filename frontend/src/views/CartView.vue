<template>
  <div>
    <h2 class="text-2xl mb-4 mx-4 mt-4 font-bold">Shopping Cart</h2>

    <div v-if="cart.length > 0" class="flex flex-col lg:flex-row lg:gap-6">
      <div class="divide-y divide-gray-300 lg:w-2/3">
        <div v-for="item in cart" :key="item._id" class="py-6 flex gap-4">
          <img class="w-48 h-48 bg-beige rounded-md ml-4" :src="item.image" />
          <div class="flex justify-between w-full">
            <div class="w-9">
              <div class="text-xl font-bold text-blue-800">{{ item.prodname }}</div>
              <div class="text-lg text-gray-700">${{ item.price / 100 }}</div>
            </div>

            <div>
              <select class="bg-white border border-gray-300 rounded px-4 py-2" v-model.number="item.quantityInCart">
                <option v-for="i in item.quantityInStock > 10 ? item.quantityInStock : 10" :key="i">
                  {{ i }}
                </option>
              </select>
            </div>

            <div>
              <input type="checkbox" v-model="item.checked" />
            </div>

            <div>
              <XMarkIcon class="w-8 h-8 text-red-500 hover:text-red-700 cursor-pointer"
                @click="removeFromCart(item._id)" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 rounded-md p-6 lg:w-1/3 flex flex-col gap-6">
        <h3 class="text-lg">Order summary</h3>
      
        <div class="divide-y divide-gray-300">
          <div class="py-3 flex justify-between">
            <div>Subtotal</div>
            <div>${{ (total / 100).toFixed(2) }}</div>
          </div>
      
          <!-- Добавьте здесь код для отображения стоимости доставки и налогов, если это необходимо -->
          <div class="py-3 flex justify-between">
            <div>Tax (18%)</div>
            <div>${{ (tax / 100).toFixed(2) }}</div>
          </div>
          <div class="py-3 flex justify-between">
            <div>Shipping</div>
            <div>${{ (shipping / 100).toFixed(2) }}</div>
          </div>
      
          <div class="py-3 flex justify-between font-bold">
            <div>Order total</div>
            <div>${{ ((total + tax + shipping) / 100).toFixed(2) }}</div>
          </div>
        </div>
      
        <!-- Добавьте здесь код для обработки покупки -->
        <button class="bg-green-500 text-white rounded px-2 py-2" @click="purchase">Purchase</button>
        <button class="bg-red-500 text-white rounded px-2 py-2" @click="removeSelected">Remove Selected</button>
        <div class="mb-4 flex items-center justify-center">
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded text-orange-500" />
          <label class="ml-2 text-lg">Select All</label>
        </div>
      </div>
    </div>     

    <transition name="fade">
      <modal v-if="showModal" @close-modal="showModal = false">
        <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center" @click="$emit('close-modal')">
          <div class="bg-white rounded p-8 relative" @click.stop>
            <button class="absolute top-1 right-1 text-red-500" @click="showModal = false">X</button>
            Purchase successful!
            <div class="text-red-500 text-lg mt-4">Total: ${{ ((total + tax + shipping) / 100).toFixed(2) }}</div>
            <vue-confetti />
          </div>
        </div>
      </modal>
    </transition>
    
    
  </div>
</template>
          
<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const cart = ref([])
const showModal = ref(false)
const selectAll = ref(false)

async function fetchCart() {
  try {
    const response = await axios.get('http://localhost:3001/api/cart/')
    cart.value = response.data
  } catch (err) {
    console.log(err)
    alert('Error fetching cart')
  }
}

onMounted(() => {
  fetchCart()
})

const total = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price * item.quantityInCart, 0)
})

const tax = computed(() => {
  return Math.round(total.value * 0.18 * 100) / 100
})

const shipping = computed(() => {
  return Math.round(total.value * 0.015 * 100) / 100
})

async function removeFromCart(id) {
  try {
    await axios.delete(`http://localhost:3001/api/cart/${id}`)
    await fetchCart()
  } catch (err) {
    console.log(err)
    alert('Error removing product from cart')
  }
}

async function removeSelected() {
  try {
    const selectedItems = cart.value.filter((item) => item.checked)
    for (const item of selectedItems) {
      await removeFromCart(item._id)
    }
  } catch (err) {
    console.log(err)
    alert('Error removing selected products from cart')
  }
}

function purchase() {
  showModal.value = true
}

function toggleSelectAll() {
  if (selectAll.value) {
    cart.value.forEach((item) => (item.checked = true))
  } else {
    cart.value.forEach((item) => (item.checked = false))
  }
}
</script>

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}</style>
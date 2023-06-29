<template>
	<div>
		<div class="relative back p-10 text-center shadow-lg bg-fixed">
			<h1 class="text-8xl font-bold text-white mb-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 tracking-widest relative overflow-hidden w-full">
  <span class="text-stroke">AloExpress</span>
</h1>

			<p class="text-md font-medium mb-6 text-white absolute bottom-0 left-0 p-6">
				AloExpress is your one-stop shop for all your shopping needs.
			</p>
			<a href="/shop" class="button-learn-more absolute bottom-0 right-0 mb-6 mr-6">
				Learn More
			</a>
		</div>
		<div class="container mx-auto p-5 md:p-10 flex flex-col gap-10">
			<div class="text-center">
				<h2 class="text-3xl font-bold mb-4 text-blue-600">What is AloExpress All About?</h2>
				<p class="text-lg mb-6 text-gray-700">
					AloExpress aims to revolutionize the way people shop by providing a seamless online shopping experience.
					Our platform connects buyers and sellers, offering a vast selection of products at competitive prices.
				</p>
			</div>
			<div class="grid grid-cols-3 gap-4">
				<img src="../assets/A4 - Poster 4.png" alt="AloExpress" class="w-full rounded-lg h-full object-cover"
					loading="lazy" />
				<img src="../assets/A4 - Poster 2.png" alt="AloExpress" class="w-full rounded-lg h-full object-cover"
					loading="lazy" />
				<img src="../assets/A4 - Poster 3.png" alt="AloExpress" class="w-full rounded-lg h-full object-cover"
					loading="lazy" />
			</div>
		</div>
		<div class="container mx-auto p-5 md:p-10 flex flex-col gap-10">
			<section class="flex flex-col md:flex-row gap-10 bg-gray-100 p-5">
				<div class="md:w-1/2">
					<h2 class="text-3xl font-bold mb-4 text-blue-600">Features</h2>
					<p class="text-lg mb-6 text-gray-700">
						Explore the various features of AloExpress that make your shopping experience better than ever. From
						advanced search options to secure payment methods, we've got you covered.
					</p>
				</div>
				<div class="md:w-1/2">
					<img src="../assets/12.png" alt="Features" class="w-full rounded-lg h-full object-cover"
						loading="lazy" />
				</div>
			</section>
			<section class="flex flex-col md:flex-row gap-10 bg-gray-100 p-5">
				<div class="md:w-1/2">
					<img src="../assets/t_sphere_4.png" alt="Flexibility" class="w-full rounded-lg h-full object-cover"
						loading="lazy" />
				</div>
				<div class="md:w-1/2">
					<h2 class="text-3xl font-bold mb-4 text-blue-600">Flexibility</h2>
					<p class="text-lg mb-6 text-gray-700">
						AloExpress offers flexible shopping options to suit your preferences. Whether you prefer home
						delivery or in-store pickup, we give you the freedom to choose what works best for you.
					</p>
				</div>
			</section>
		</div>
		<footer class="bg-gray-200 py-4 text-center">
			<p class="text-gray-600">© 2023 AloExpress. All rights reserved.</p>
		</footer>
	</div>
</template>
  
  

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import { onMounted } from 'vue';

onMounted(() => {
	AOS.init();
});

</script>

<style>
.back {
	background-image: url('../assets/landing.png');
	background-size: cover;
	background-position: center;
	height: 500px;
}
.text-stroke {
    fill: none;
    stroke: blue;
    stroke-width: 1px;
	letter-spacing: 100px;
    mix-blend-mode: multiply;
  }
.button-learn-more {
	font-size: 1.5rem;
	text-shadow: -15px 5px 20px #ced0d3;
	letter-spacing: 0.02em;
	text-align: center;
	color: #F9f1cc;
	transition: 0.3s ease;
}

.button-learn-more:hover {
	text-shadow: 5px 5px 0px #FFB650,
		10px 10px 0px #FFD662,
		15px 15px 0px #FF80BF,
		20px 20px 0px #EF5097,
		25px 25px 0px #6868AC,
		30px 30px 0px #90B1E0;
}
</style>
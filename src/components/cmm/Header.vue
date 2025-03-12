<template>
	<header class="header-area">
		<h1><span>점심메뉴 당신의 선택은!</span></h1>
		<button @click="onClickAbout('home')">HOME</button>
		<button @click="onClickAbout('about')">ABOUT</button>
	</header>
</template>

<script setup>
	import {
		ref,
		onMounted,
		computed
	} from 'vue';
	import {
		useRouter
	} from 'vue-router';
	const router = useRouter();

	const onClickAbout = (e) => {
		if (e === 'home') {
			router.push({
				name: 'HomeView'
			});
		} else if (e === 'about') {
			router.push({
				name: 'About'
			});
		}

	}

</script>

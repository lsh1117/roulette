<template>
	<div ref="container" class="portfolio-container"></div>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue';
	import * as THREE from 'three';
	import portfolioData from '@/assets/json/portfolio.json';

	const container = ref(null);
	let scene, camera, renderer, objects = [];
	let scrollY = 0,
		targetScrollY = 0;
	let currentIndex = 0;

	const init = () => {
		// Scene
		scene = new THREE.Scene();

		// Camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 5;

		// Renderer
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.value.appendChild(renderer.domElement);

		// Lights
		const ambientLight = new THREE.AmbientLight(0x404040);
		scene.add(ambientLight);
		const pointLight = new THREE.PointLight(0xffffff, 1, 100);
		pointLight.position.set(10, 10, 10);
		scene.add(pointLight);

		// Create portfolio items
		portfolioData.forEach((item, index) => {
			const geometry = new THREE.BoxGeometry(1, 1, 0.1);
			const texture = item.image ? new THREE.TextureLoader().load(item.image) : null;
			const material = new THREE.MeshBasicMaterial({
				map: texture
			});
			const cube = new THREE.Mesh(geometry, material);
			cube.position.x = Math.sin(index * 0.5) * 3;
			cube.position.y = Math.cos(index * 0.5) * 3;
			cube.position.z = -index * 2;
			scene.add(cube);
			objects.push(cube);
		});

		// Scroll event
		window.addEventListener('scroll', onScroll);

		// Animation loop
		animate();
	};

	const onScroll = () => {
		targetScrollY = window.scrollY;
	};

	const animate = () => {
		requestAnimationFrame(animate);

		// Smooth scroll
		scrollY += (targetScrollY - scrollY) * 0.1;

		// Rotate objects
		objects.forEach((obj, index) => {
			obj.rotation.y = scrollY * 0.01;
			obj.rotation.x = scrollY * 0.01;
		});

		renderer.render(scene, camera);
	};

	onMounted(() => {
		init();
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', onScroll);
		renderer.dispose();
	});

</script>

<style scoped>
	.portfolio-container {
		width: 100%;
		height: 100vh;
	}

</style>

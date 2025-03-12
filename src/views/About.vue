<template>
	<div ref="container" class="visualizer-container"></div>
</template>

<script setup>
	import * as THREE from 'three';
	import {
		ref,
		onMounted
	} from 'vue';

	const container = ref(null);
	let scene, camera, renderer, particleSystem, analyser, frequencyData, particles;

	onMounted(() => {
		init();
		loadMusic();
		animate();
	});

	function init() {
		const width = window.innerWidth;
		const height = window.innerHeight;

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.z = 500;

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(width, height);
		container.value.appendChild(renderer.domElement);

		const particleCount = 512;
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);
		const colors = new Float32Array(particleCount * 3);
		particles = new THREE.Points(geometry, new THREE.PointsMaterial({
			size: 2,
			vertexColors: true
		}));

		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (i - particleCount / 2) * 2; // x
			colors[i * 3 + 1] = i / particleCount; // green
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		scene.add(particles);
	}

	function loadMusic() {
		const audio = new Audio('../mp3/Jackson.mp3');
		const audioContext = new(window.AudioContext || window.webkitAudioContext)();
		const source = audioContext.createMediaElementSource(audio);
		analyser = audioContext.createAnalyser();
		source.connect(analyser);
		analyser.connect(audioContext.destination);
		analyser.fftSize = 1024;
		frequencyData = new Uint8Array(analyser.frequencyBinCount);
		audio.play();
	}

	function animate() {
		requestAnimationFrame(animate);
		analyser.getByteFrequencyData(frequencyData);

		let positions = particles.geometry.attributes.position.array;
		let colors = particles.geometry.attributes.color.array;

		for (let i = 0; i < frequencyData.length; i++) {
			positions[i * 3 + 1] = frequencyData[i] * 0.5 - 100; // y
			const color = new THREE.Color(`hsl(${frequencyData[i] * 1.2}, 100%, 50%)`);
			colors[i * 3] = color.r;
			colors[i * 3 + 1] = color.g;
			colors[i * 3 + 2] = color.b;
		}

		particles.geometry.attributes.position.needsUpdate = true;
		particles.geometry.attributes.color.needsUpdate = true;

		renderer.render(scene, camera);
	}

</script>

<style>
	.visualizer-container {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
	}

</style>

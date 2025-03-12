<template>
	<div ref="container" class="container" v-show="isVisible"></div>
</template>

<script setup>
	import * as THREE from 'three';
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		FontLoader
	} from 'three/examples/jsm/loaders/FontLoader.js';
	import {
		TextGeometry
	} from 'three/examples/jsm/geometries/TextGeometry.js';

	const container = ref(null);
	let scene, camera, renderer, group;
	let arrows = [];
	let letters = [];
	const textContent = "SAMDORY";
	const isVisible = ref(false);
	let animationComplete = false;
	let textMesh = null;
	let frameCount = 0;

	onMounted(() => {
		init();
		addArrows();
		animateLetters();
	});

	function init() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 200;
		renderer = new THREE.WebGLRenderer({
			alpha: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setAnimationLoop( animate );
		container.value.appendChild(renderer.domElement);

		group = new THREE.Group();
		group.position.y = 500;
		scene.add(group);
	}

	function addArrows() {
		const arrowGeometry = new THREE.ConeGeometry(30, 200, 32);
		const arrowMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		for (let i = 0; i < 500; i++) {
			const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
			arrow.position.set(
				Math.random() * 1200 - 600,
				Math.random() * 600 - 600,
				Math.random() * 500 - 500 
			);
			arrow.rotation.z = -Math.PI / 2;
			group.add(arrow);
			arrows.push(arrow);
		}
	}

	function animateLetters() {
		const loader = new FontLoader();
		loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
			let index = 0;
			const max = textContent.length;
			const interval = setInterval(() => {
				if (index < max) {
					showLetter(font, textContent[index], index);
					index++;
				} else {
					clearInterval(interval);
				}
			}, 1000);

			animate();
		});
	}

	function showLetter(font, letter, index) {
		const color = new THREE.Color(`hsl(${index / textContent.length * 360}, 100%, 50%)`);
		const textGeo = new TextGeometry(letter, {
			font: font,
			size: 20,
			height: 5
		});
		const textMaterial = new THREE.MeshPhongMaterial({
			color: color.getHex(),
			emissive: color.getHex()
		});
		textMesh = new THREE.Mesh(textGeo, textMaterial);
		textMesh.position.x = index * 25 - 100;
		group.add(textMesh);
		letters.push(textMesh);

		setTimeout(() => {
			group.remove(textMesh);
		}, 950);
	}

	function animate() {
		if (textMesh && !animationComplete) {
			arrows.forEach(arrow => {
				arrow.position.y -= 20;
			});
			frameCount++;
			if(frameCount > 300){
				isVisible.value = false;
				animationComplete = true;
			}
		}
		renderer.render(scene, camera);
	}

	function startAnimation(callBack) {
		frameCount = 0;
		animationComplete = false;
		isVisible.value = true;
		arrows.forEach(arrow => {
			arrow.position.set(
				Math.random() * 1200 - 600,
				Math.random() * 1200 - 0,
			);
			arrow.rotation.z = Math.PI;
		});
		animate();

		if(callBack){
			callBack && callBack();
		}
	}

	defineExpose({
		startAnimation
	});

</script>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
	}

</style>

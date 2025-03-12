<!-- src/App.vue -->
<template>
	<div class="app-container">
		<router-view />
		<PopupManager />
		<CanvasTransition ref="canvasTransition" />
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		useRouter
	} from 'vue-router'
	import CanvasTransition from '@/components/CanvasTransition.vue'

	const canvasTransition = ref(null)
	const router = useRouter()

	router.beforeEach((to, from, next) => {		
		canvasTransition.value.startAnimation(() => {
			setTimeout(function(){
				next();
			},500)
		})
	})

</script>

<style scoped>
	.app-container {
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100vh;
	}

</style>

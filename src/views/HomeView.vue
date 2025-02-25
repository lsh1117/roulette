<template>
	<div class="roulette-container">
		<canvas ref="canvasRef" width="500" height="500" class="roulette"></canvas>
		<div class="arrow"></div>
		<button @click="startRoulette" :disabled="isSpinning">START</button>
		<p v-if="selectedMarket" class="result">오늘의 점심은 <strong>{{ selectedMarket }}</strong>!</p>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted,
		computed
	} from 'vue';
	import {
		useMarketStore
	} from '@/stores/marketStore';

	const marketStore = useMarketStore();
	const canvasRef = ref(null);
	const isSpinning = ref(false);
	const selectedMarket = ref(null);
	const rotation = ref(0);
	let spinTimeout = null;

	// 식당 목록 가져오기
	const markets = computed(() => marketStore.markets);
	const segmentCount = computed(() => markets.value.length);
	const segmentAngle = computed(() => (2 * Math.PI) / segmentCount.value);

	// 컬러 코드값
	const categoryColors = computed(() => marketStore.categoryColors);
	const categoryImages = computed(() => marketStore.categoryImages);

	const loadImages = (markets) => {
		return Promise.all(
			markets.value.map((market) => {
				return new Promise((resolve) => {
					const img = new Image();
					img.src = `/assets/images/ico_flag_${market.category}.svg`;
					img.onload = () => resolve({
						category: market.category,
						img
					});
				});
			})
		);
	}

	const drawRoulette = async() => {
		const canvas = canvasRef.value;
		if (!canvas) return;

		const images = await loadImages(markets); // 모든 이미지가 로드될 때까지 기다림

		const ctx = canvas.getContext('2d');
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = centerX;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// 룰렛 구역 그리기
		markets.value.forEach((market, index) => {
			const startAngle = index * segmentAngle.value;
			const endAngle = startAngle + segmentAngle.value;

			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.closePath();

			const category = market.category;
			const fillColor = categoryColors.value[category] || '#ccc'; // 기본 색상;
			const imgObj = images.find((img) => img.category === market.category);

			console.log("#########",imgObj)
			
			if (imgObj) {
				ctx.save();
				ctx.globalAlpha = 0.5;
				const pattern = ctx.createPattern(imgObj.img, "repeat");
				ctx.fillStyle = pattern;
				ctx.fill();
				ctx.stroke();
				ctx.restore();
				/*
				const img = new Image();
				img.src = imgObj;
				img.onload = () => {
					const pattern = ctx.createPattern(img, "repeat");
					ctx.fillStyle = pattern;
					ctx.fill();
					ctx.stroke();
				};
				*/
				
			} else {
				ctx.fillStyle = fillColor; // 기본 회색
				ctx.fill();
				ctx.stroke();
			}

			// 텍스트 배치
			ctx.globalAlpha = 1;
			ctx.fillStyle = 'white';
			ctx.font = '16px Arial';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			const textX = centerX + Math.cos(startAngle + segmentAngle.value / 2) * (radius * 0.7);
			const textY = centerY + Math.sin(startAngle + segmentAngle.value / 2) * (radius * 0.7);
			ctx.fillText(market.name, textX, textY);
		});
	};

	// 룰렛 돌리기
	const startRoulette = () => {
		if (isSpinning.value) return;
		isSpinning.value = true;
		selectedMarket.value = null;

		let speed = Math.random() * 10 + 20; // 초기 속도
		const duration = 5000; // 5초 동안 회전
		const startTime = Date.now();

		const spin = () => {
			const elapsed = Date.now() - startTime;

			if (elapsed < duration) {
				speed *= 0.98; // 점점 감속
				rotation.value += speed;
				requestAnimationFrame(spin);
			} else {
				finalizeSelection();
			}

			drawRoulette();
			const canvas = canvasRef.value;
			canvas.style.transform = `rotate(${rotation.value}deg)`;
		};

		spin();
	};

	// 최종 선택된 식당 계산
	const finalizeSelection = () => {
		const finalRotation = (rotation.value % 360) / 360;
		const selectedIndex = Math.floor(segmentCount.value - (finalRotation * segmentCount.value));
		selectedMarket.value = markets.value[selectedIndex].name;
		isSpinning.value = false;
	};

	onMounted(() => {
		drawRoulette();
	});

</script>

<style scoped>
	.roulette-container {
		width: 500px;
		height: 500px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	canvas {
		width: 100%;
		border-radius: 50%;
		border: 2px solid #333;
		transition: transform 0.5s ease-out;
	}

	.arrow {
		position: absolute;
		top: 50%;
		right: -30px;
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 30px solid red;
		transform: translateX(-50%) translateY(-50%) rotate(270deg);
	}

	button {
		padding: 10px 20px;
		font-size: 16px;
		background: #e76f51;
		color: white;
		border: none;
		cursor: pointer;
		margin-top: 30px;
	}

	.result {
		margin-top: 20px;
		font-size: 18px;
		color: #FFF;
	}

	@media screen and (max-width: 360px) {

		/*코드 작성*/
		.roulette-container {
			width: 270px;
			height: 270px;
		}

		.arrow {
			border-left: 7px solid transparent;
			border-right: 7px solid transparent;
			border-bottom: 15px solid red;
			right: -12px;
		}
	}

	@media screen and (min-width: 360px) and (max-width: 570px) {

		/*코드 작성*/
		.roulette-container {
			width: 320px;
			height: 320px;
		}

		.arrow {
			right: -15px;
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			border-bottom: 20px solid red;
		}
	}

</style>

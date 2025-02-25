<template>
	<div>
		<div class="scroll-area">
			<article class="article-area" v-for="recommend in recommends" :key="recommend">
				<div class="ball-area">
					<ul class="ball-list">
						<li class="ball-item" v-for="item in recommend.numbers" :key="item">
							<span class="ball-645 ball-645-medium" :class="'ball-' + getGroup(item.number)">{{item.number}}</span>
						</li>
					</ul>
				</div>
			</article>
		</div>
		
		<div class="btn-area btn-area-center">
			<button class="btn-primary btn-small" @click="$emit('close')">닫기</button>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, ref } from "vue";
	import { useCalculateStore } from "@/stores/CalculateStore";
	import { useExceptionStore } from "@/stores/ExceptionStore";
	import { useFixedStore } from "@/stores/FixedStore";
	import { useRecommendStore } from "@/stores/RecommendStore";
	import { useDrwStore } from "@/stores/DrwStore";

	// Pinia store 가져오기
	const exceptionStore = useExceptionStore();
	const fixedStore = useFixedStore();
	const calculateStore = useCalculateStore();
	const recommendStore = useRecommendStore();
	const drwStore = useDrwStore();

	// 제외 번호
	const _exceptionNumber = exceptionStore.numbers;
	// 고정 번호
	const _fixedNumber = fixedStore.numbers;

	// 다음 회차 번호
	const _nextDrw = Number(drwStore.numbers[0].drwNo) + 1;

	// 번호뽑기시 삭제해야 할 번호. ( 제외번호+고정번호 )
	const _exc = _exceptionNumber.concat(_fixedNumber);

	// 계산에 필요한 모든 숫자 
	let _totalNumbers = [...calculateStore.getNumbers()];

	// 번호뽑기시 삭제해야 할 번호 제외 한 전체 번호
	let _newTotalNumbers = _totalNumbers.filter(item => !_exc.includes(item));

	// 고정번호를 제외한 나머지 번호 갯수
	const _cnt = 6 - _fixedNumber.length;

	// 추천 번호 리스트
	const recommends = ref([]);

	// 추천 번호 갯수 정의
	const _recommendCnt = 100;
	
	for( let j=0;j<_recommendCnt;j++){
		let _list = [..._newTotalNumbers];
		let _numbers = [];
		for(let i=0;i<_cnt;i++) {
			let _number = getRandomElement(_list);
			_list = _list.filter(item => item !== _number);
			const _numberObj = {
				number:_number,
			}
			_numbers.push(_numberObj);
		}

		// 고정 번호 추가.
		_fixedNumber.forEach(item=>{
			_numbers.push({
				number:item
			})
		})
		_numbers.sort((a, b) => a.number - b.number);

		const _recommend = {
			"numbers":_numbers
		};

		recommends.value.push(_recommend);
		recommendStore.addRecommend(_numbers,_nextDrw);
	}

	

	// 번호 그룹 계산 함수
	function getGroup(n) {
		return Math.floor((n - 1) / 10) + 1;
	}

	function getRandomElement(array) {
		if (!Array.isArray(array) || array.length === 0) {
			throw new Error("유효한 배열을 입력해주세요.");
		}

		// 배열의 인덱스를 랜덤으로 선택
		const randomIndex = Math.floor(Math.random() * array.length);

		// 선택된 인덱스의 요소 반환
		return array[randomIndex];
	}

	onMounted(() => {
		//console.log("###### 번호 뽑기 onMounted" );
	});
</script>

<style scoped>
</style>

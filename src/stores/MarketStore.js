import {
	defineStore
} from 'pinia';

export const useMarketStore = defineStore('marketStore', {
	state: () => ({
		markets: [{
				name: "오군(순두부)",
				category: "han",
			},
			{
				name: "동원(감자탕)",
				category: "jung",
			},
			{
				name: "오징어풍경",
				category: "yang",
			},
			{
				name: "나주곰탕",
				category: "il",
			},
			{
				name: "이화수육개장",
				category: "bun",
			},
			{
				name: "오는정(생선구이)",
				category: "fast",
			},
			{
				name: "뼈해장국",
				category: "han",
			},
			{
				name: "오봉집",
				category: "han",
			},
            {
				name: "고려보쌈",
				category: "han",
			},
            {
				name: "부산아지매국밥",
				category: "han",
			},
		],
		categoryColors: {
			han: '#D94F30', //
			jung: '#FF5733', //
			yang: '#cba315', //
			il: '#3F72AF', // 
			bun: '#FF8FAB', //
			fast: '#C70039' // 
		}
	}),
	actions: {
		setMarkets(markets) {
			this.markets = markets;
		},
		getMarkets() {
			return this.markets;
		},
	}
})

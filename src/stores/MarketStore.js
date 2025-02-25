import {
	defineStore
} from 'pinia';

export const useMarketStore = defineStore('marketStore', {
	state: () => ({
		markets: [{
				name: "오군(순두부)",
				category: "kr",
			},
			{
				name: "동원(감자탕)",
				category: "kr",
			},
			{
				name: "오징어풍경",
				category: "en",
			},
			{
				name: "나주곰탕",
				category: "cn",
			},
			{
				name: "이화수육개장",
				category: "jp",
			},
			{
				name: "오는정(생선구이)",
				category: "kr",
			},
			{
				name: "뼈해장국",
				category: "kr",
			},
			{
				name: "오봉집",
				category: "kr",
			},
            {
				name: "고려보쌈",
				category: "kr",
			},
            {
				name: "부산아지매국밥",
				category: "kr",
			},
            {
				name: "오마이포(쌀국수)",
				category: "vn",
			},
            
		],
		categoryColors: {
			kr: '#D94F30', //
			cn: '#FF5733', //
			en: '#cba315', //
			jp: '#3F72AF', // 
			th: '#C70039', // 
			vn: '#C70039', // 
			bun: '#FF8FAB', //
			fast: '#C70039', // 
		},
		categoryImages: {
			kr: 'ico_flag_kr.svg', //
			cn: 'ico_flag_cn.svg', //
			en: 'ico_flag_en.svg', //
			jp: 'ico_flag_jp.svg', // 
			th: 'ico_flag_th.svg', // 
			vn: 'ico_flag_vn.svg', // 
			bun: 'ico_flag_kr.svg', //
			fast: 'ico_flag_kr.svg', // 
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

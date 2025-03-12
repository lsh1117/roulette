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
				category: "kr",
			},
			{
				name: "나주곰탕",
				category: "kr",
			},
			{
				name: "이화수육개장",
				category: "kr",
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
            {
				name: "알돈",
				category: "jp",
			},
			{
				name: "가쯔야",
				category: "jp",
			},
			{
				name: "원흥",
				category: "cn",
			},
			{
				name: "용호동낙지",
				category: "kr",
			},
			{
				name: "당대일품",
				category: "cn",
			},
			{
				name: "사이공",
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
			kr: 'ico_flag_kr.png', //
			cn: 'ico_flag_cn.png', //
			en: 'ico_flag_en.png', //
			jp: 'ico_flag_jp.png', // 
			th: 'ico_flag_th.png', // 
			vn: 'ico_flag_vn.png', // 
			bun: 'ico_flag_kr.png', //
			fast: 'ico_flag_kr.png', // 
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

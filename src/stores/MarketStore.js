import { defineStore } from 'pinia';

export const useMarketStore = defineStore('marketStore', {
	state: () => ({
		markets: [
            {
                name:"오군(순두부)",
                type:"한식",
            },
            {
                name:"동원(감자탕)",
                type:"한식",
            },
            {
                name:"오징어풍경",
                type:"한식",
            },
            {
                name:"나주곰탕",
                type:"한식",
            },
            {
                name:"이화수육개장",
                type:"한식",
            },
            {
                name:"오는정(생선구이)",
                type:"한식",
            },
            {
                name:"뼈해장국",
                type:"한식",
            },
            {
                name:"오봉집",
                type:"한식",
            },
        ]
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

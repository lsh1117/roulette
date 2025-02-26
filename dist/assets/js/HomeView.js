import{d as D,_ as N,r as m,c as s,o as E,a as b,b as f,e as A,t as H,f as X,g as C}from"./index.js";const Y=D("marketStore",{state:()=>({markets:[{name:"오군(순두부)",category:"kr"},{name:"동원(감자탕)",category:"kr"},{name:"오징어풍경",category:"kr"},{name:"나주곰탕",category:"kr"},{name:"이화수육개장",category:"kr"},{name:"오는정(생선구이)",category:"kr"},{name:"뼈해장국",category:"kr"},{name:"오봉집",category:"kr"},{name:"고려보쌈",category:"kr"},{name:"부산아지매국밥",category:"kr"},{name:"오마이포(쌀국수)",category:"vn"}],categoryColors:{kr:"#D94F30",cn:"#FF5733",en:"#cba315",jp:"#3F72AF",th:"#C70039",vn:"#C70039",bun:"#FF8FAB",fast:"#C70039"},categoryImages:{kr:"ico_flag_kr.png",cn:"ico_flag_cn.png",en:"ico_flag_en.png",jp:"ico_flag_jp.png",th:"ico_flag_th.png",vn:"ico_flag_vn.png",bun:"ico_flag_kr.png",fast:"ico_flag_kr.png"}}),actions:{setMarkets(w){this.markets=w},getMarkets(){return this.markets}}}),$={class:"roulette-container"},q=["disabled"],z={key:0,class:"result"},O={__name:"HomeView",setup(w){const d=Y(),v=m(null),r=m(!1),l=m(null),p=m(0),c=s(()=>d.markets),_=s(()=>c.value.length),i=s(()=>2*Math.PI/_.value),S=s(()=>d.categoryColors);s(()=>d.categoryImages);const M=a=>Promise.all(a.value.map(t=>new Promise(e=>{const o=new Image;o.src=`/assets/images/ico_flag_${t.category}.png`,o.onload=()=>e({category:t.category,img:o})}))),x=async()=>{const a=v.value;if(!a)return;const t=await M(c),e=a.getContext("2d"),o=a.width/2,g=a.height/2,n=o;e.clearRect(0,0,a.width,a.height),c.value.forEach((y,R)=>{const u=R*i.value,P=u+i.value;e.beginPath(),e.moveTo(o,g),e.arc(o,g,n,u,P),e.closePath();const T=y.category,B=S.value[T]||"#ccc",k=t.find(h=>h.category===y.category);if(console.log("#########",k),k){e.save(),e.globalAlpha=.5;const h=e.createPattern(k.img,"repeat");e.fillStyle=h,e.fill(),e.stroke(),e.restore()}else e.fillStyle=B,e.fill(),e.stroke();e.globalAlpha=1,e.fillStyle="white",e.font="16px Arial",e.textAlign="center",e.textBaseline="middle";const V=o+Math.cos(u+i.value/2)*(n*.7),j=g+Math.sin(u+i.value/2)*(n*.7);e.fillText(y.name,V,j)})},F=()=>{if(r.value)return;r.value=!0,l.value=null;let a=Math.random()*10+20;const t=5e3,e=Date.now(),o=()=>{Date.now()-e<t?(a*=.98,p.value+=a,requestAnimationFrame(o)):I(),x();const n=v.value;n.style.transform=`rotate(${p.value}deg)`};o()},I=()=>{const a=p.value%360/360,t=Math.floor(_.value-a*_.value);l.value=c.value[t].name,r.value=!1};return E(()=>{x()}),(a,t)=>(C(),b("div",$,[f("canvas",{ref_key:"canvasRef",ref:v,width:"500",height:"500",class:"roulette"},null,512),t[2]||(t[2]=f("div",{class:"arrow"},null,-1)),f("button",{onClick:F,disabled:r.value},"START",8,q),l.value?(C(),b("p",z,[t[0]||(t[0]=A("오늘의 점심은 ")),f("strong",null,H(l.value),1),t[1]||(t[1]=A("!"))])):X("",!0)]))}},J=N(O,[["__scopeId","data-v-fd8217c7"]]);export{J as default};

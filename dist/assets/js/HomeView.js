import{d as j,_ as N,r as u,c as s,o as E,a as w,b as v,e as C,t as H,f as X,g as M}from"./index.js";const Y=j("marketStore",{state:()=>({markets:[{name:"오군(순두부)",category:"kr"},{name:"동원(감자탕)",category:"kr"},{name:"오징어풍경",category:"kr"},{name:"나주곰탕",category:"kr"},{name:"이화수육개장",category:"kr"},{name:"오는정(생선구이)",category:"kr"},{name:"뼈해장국",category:"kr"},{name:"오봉집",category:"kr"},{name:"고려보쌈",category:"kr"},{name:"부산아지매국밥",category:"kr"},{name:"오마이포(쌀국수)",category:"vn"}],categoryColors:{kr:"#D94F30",cn:"#FF5733",en:"#cba315",jp:"#3F72AF",th:"#C70039",vn:"#C70039",bun:"#FF8FAB",fast:"#C70039"},categoryImages:{kr:"ico_flag_kr.svg",cn:"ico_flag_cn.svg",en:"ico_flag_en.svg",jp:"ico_flag_jp.svg",th:"ico_flag_th.svg",vn:"ico_flag_vn.svg",bun:"ico_flag_kr.svg",fast:"ico_flag_kr.svg"}}),actions:{setMarkets(p){this.markets=p},getMarkets(){return this.markets}}}),q={class:"roulette-container"},z=["disabled"],$={key:0,class:"result"},G={__name:"HomeView",setup(p){const m=Y(),f=u(null),n=u(!1),r=u(null),d=u(0),k=s(()=>m.markets),_=s(()=>k.value.length),l=s(()=>2*Math.PI/_.value),A=s(()=>m.categoryColors),F=s(()=>m.categoryImages),x=()=>{const t=f.value;if(!t)return;const e=t.getContext("2d"),a=t.width/2,o=t.height/2,c=a;e.clearRect(0,0,t.width,t.height),k.value.forEach((i,R)=>{const g=R*l.value,T=g+l.value;e.beginPath(),e.moveTo(a,o),e.arc(a,o,c,g,T),e.closePath();const S=i.category,B=A.value[S]||"#ccc",y="/assets/images/"+F.value[S]||"ico_flag_kr.svg";if(console.log("#######",y),y){const h=new Image;h.src=y,h.onload=()=>{const P=e.createPattern(h,"repeat");e.fillStyle=P,e.fill(),e.stroke()}}else e.fillStyle=B,e.fill(),e.stroke();e.fillStyle="white",e.font="16px Arial",e.textAlign="center",e.textBaseline="middle";const V=a+Math.cos(g+l.value/2)*(c*.7),D=o+Math.sin(g+l.value/2)*(c*.7);e.fillText(i.name,V,D)})},b=()=>{if(n.value)return;n.value=!0,r.value=null;let t=Math.random()*10+20;const e=5e3,a=Date.now(),o=()=>{Date.now()-a<e?(t*=.98,d.value+=t,requestAnimationFrame(o)):I(),x();const i=f.value;i.style.transform=`rotate(${d.value}deg)`};o()},I=()=>{const t=d.value%360/360,e=Math.floor(_.value-t*_.value);r.value=k.value[e].name,n.value=!1};return E(()=>{x()}),(t,e)=>(M(),w("div",q,[v("canvas",{ref_key:"canvasRef",ref:f,width:"500",height:"500",class:"roulette"},null,512),e[2]||(e[2]=v("div",{class:"arrow"},null,-1)),v("button",{onClick:b,disabled:n.value},"START",8,z),r.value?(M(),w("p",$,[e[0]||(e[0]=C("오늘의 점심은 ")),v("strong",null,H(r.value),1),e[1]||(e[1]=C("!"))])):X("",!0)]))}},K=N(G,[["__scopeId","data-v-7e8c2785"]]);export{K as default};

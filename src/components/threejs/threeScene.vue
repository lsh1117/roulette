<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from "three";
import gsap from "gsap";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = ref(null);
const portfolioMeshes = [];
const scrollSpeed = ref(0);
const selectedIndex = ref(null);
const description = ref("");
const showDescription = ref(false);

onMounted(() => {
  // 렌더러 설정
  renderer.value = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.value.domElement);

  camera.position.z = 10;

  const portfolioData = [
    { image: "https://source.unsplash.com/random/200x300?sig=1", desc: "포트폴리오 1 설명" },
    { image: "https://source.unsplash.com/random/200x300?sig=2", desc: "포트폴리오 2 설명" },
    { image: "https://source.unsplash.com/random/200x300?sig=3", desc: "포트폴리오 3 설명" },
    { image: "https://source.unsplash.com/random/200x300?sig=4", desc: "포트폴리오 4 설명" },
    { image: "https://source.unsplash.com/random/200x300?sig=5", desc: "포트폴리오 5 설명" },
  ];

  const textureLoader = new THREE.TextureLoader();

  portfolioData.forEach((item, index) => {
    const geometry = new THREE.PlaneGeometry(2, 3);
    const texture = textureLoader.load(item.image);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    const angle = (index / portfolioData.length) * Math.PI * 2;
    mesh.position.set(Math.sin(angle) * 5, index * -2, Math.cos(angle) * 5);
    mesh.rotation.y = angle;

    scene.add(mesh);
    portfolioMeshes.push({ mesh, desc: item.desc });
  });

  function animate() {
    requestAnimationFrame(animate);

    portfolioMeshes.forEach(({ mesh }, index) => {
      mesh.rotation.y += scrollSpeed.value * 0.01;
      mesh.position.y += scrollSpeed.value * 0.05;
    });

    scrollSpeed.value *= 0.9;

    // 정면 박스 찾기
    let closestIndex = null;
    let closestZ = Infinity;
    portfolioMeshes.forEach(({ mesh }, index) => {
      const distance = Math.abs(mesh.position.z - camera.position.z);
      if (distance < closestZ) {
        closestZ = distance;
        closestIndex = index;
      }
    });

    if (selectedIndex.value !== closestIndex) {
      selectedIndex.value = closestIndex;
      showDescription.value = false;

      // 박스 확대 애니메이션
      gsap.to(portfolioMeshes[closestIndex].mesh.scale, { x: 1.5, y: 1.5, duration: 0.5 });

      // 설명 업데이트
      setTimeout(() => {
        description.value = portfolioMeshes[closestIndex].desc;
        showDescription.value = true;
      }, 500);
    }

    renderer.value.render(scene, camera);
  }

  animate();

  function onScroll(event) {
    scrollSpeed.value = event.deltaY * 0.001;
    showDescription.value = false;

    // 모든 박스 크기 원래대로
    portfolioMeshes.forEach(({ mesh }) => {
      gsap.to(mesh.scale, { x: 1, y: 1, duration: 0.5 });
    });
  }

  window.addEventListener("wheel", onScroll);

  onUnmounted(() => {
    window.removeEventListener("wheel", onScroll);
    document.body.removeChild(renderer.value.domElement);
  });
});
</script>

<template>
  <div class="description-box" v-if="showDescription">
    {{ description }}
  </div>
</template>

<style scoped>
canvas {
  display: block;
}
.description-box {
  position: fixed;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 10px;
  font-size: 18px;
  opacity: 1;
  transition: opacity 0.5s;
}
</style>

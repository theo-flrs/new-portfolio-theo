<template>
  <div>
    <canvas ref="experience" />
  </div>
</template>

<script lang="ts" setup>
  import { gsap } from "gsap";
  import {
    Scene,
    PerspectiveCamera,
    Mesh,
    SphereGeometry,
    MeshStandardMaterial,
    WebGLRenderer,
    Color,
    Fog,
    PointLight,
    Object3D,
    Box3,
    Vector3,
  } from "three";
  import { Ref } from "vue";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

  let renderer: WebGLRenderer;
  let controls: OrbitControls;

  const experience: Ref<HTMLCanvasElement | null> = ref(null);
  const { width, height } = useWindowSize();
  const aspectRatio = computed(() => width.value / height.value);

  const bgColor = new Color("#050505");
  const scene = new Scene();

  scene.fog = new Fog(bgColor, 0.1, 75);
  scene.background = bgColor;
  const camera = new PerspectiveCamera(50, aspectRatio.value, 0.1, 1000);
  camera.position.set(0, 0, 1);

  scene.add(camera);

  const light = new PointLight(0xc42c18, 2000, 30);
  light.position.set(0, 0, 0);
  scene.add(light);

  const { load } = useGLTFModel();
  const { scene: model } = await load("rose.gltf");
  scene.add(model);

  //PIVOT
  const pivot = new Object3D();
  scene.add(pivot);
  const bbox = new Box3().setFromObject(model);
  const center = bbox.getCenter(new Vector3());
  model.position.set(-center.x, -center.y, -center.z);
  pivot.rotation.set(0, -0.1, 0);
  pivot.add(model);
  //PIVOT

  const newMaterial = new MeshStandardMaterial({
    metalness: 0.9,
    roughness: 0,
    color: "#000000",
  });
  model.traverse((o: any) => {
    if (o.isMesh) o.material = newMaterial;
  });

  // const centerX = window.innerWidth / 2;
  window.addEventListener("mousemove", (event) => {
    // model.rotation.y = (event.clientX / window.innerWidth) * -0.15;
    // pivot.rotation.y = ((event.clientX - centerX) / window.innerWidth) * 2;
    light.position.x = (event.clientX / window.innerWidth) * 15;
    light.position.y = (event.clientY / window.innerHeight) * 15;
  });

  function updateCamera() {
    camera.aspect = aspectRatio.value;
    camera.updateProjectionMatrix();
  }

  function updateRenderer() {
    renderer.setSize(width.value, height.value);
    renderer.render(scene, camera);
  }

  function setRenderer() {
    if (experience.value) {
      renderer = new WebGLRenderer({ canvas: experience.value, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enableRotate = true;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
      updateRenderer();
    }
  }

  watch(aspectRatio, () => {
    updateCamera();
    updateRenderer();
  });
  onMounted(() => {
    setRenderer();
    loop();

    //Rotation de départ
    gsap.from(pivot.rotation, { duration: 3, y: -20 });
    //Position de départ
    gsap.from(pivot.position, { duration: 3, y: -2 });
  });
  const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  };
</script>

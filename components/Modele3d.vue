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
    MeshStandardMaterial,
    WebGLRenderer,
    Mesh,
    Color,
    Fog,
    PointLight,
    Object3D,
    Box3,
    Vector3,
    PlaneGeometry,
    ShaderMaterial,
    Vector2,
    TextureLoader,
    RepeatWrapping,
    Clock,
  } from "three";
  import { Ref } from "vue";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

  let renderer: WebGLRenderer;
  let controls: OrbitControls;

  const clock = new Clock();

  const experience: Ref<HTMLCanvasElement | null> = ref(null);
  const { width, height } = useWindowSize();
  const aspectRatio = computed(() => width.value / height.value);

  // const bgColor = new Color("#050505");
  const bgColor = new Color("#ffffff");
  const scene = new Scene();

  scene.fog = new Fog(bgColor, 0.1, 10);
  scene.background = bgColor;
  const camera = new PerspectiveCamera(50, aspectRatio.value, 0.1, 1000);
  camera.position.set(0, 0, 1);

  scene.add(camera);

  const light = new PointLight(0xc42c18, 2000, 40);
  light.position.set(0, 0, 0);
  scene.add(light);

  //METAL LIQUIDE

  const uniforms = {
    iGlobalTime: { type: "f", value: 0.0 },
    audio1: { type: "f", value: 0.0 },
    iResolution: { type: "v2", value: new Vector2() },
    iChannel0: {
      type: "t",
      value: new TextureLoader().load("../assets/images/bg1.png"),
    },
  };

  uniforms.iChannel0.value.wrapS = uniforms.iChannel0.value.wrapT =
    RepeatWrapping;

  const material = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: `
    uniform float iGlobalTime;
    uniform vec2 iResolution;
    uniform vec4 iMouse;
    uniform float audio1;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;

    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.5 );
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
    fragmentShader: `
    uniform float iGlobalTime;
    uniform vec2 iResolution;
    uniform vec4 iMouse;
    uniform float audio1;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;

    #define t iGlobalTime

    mat2 m(float a){
        float c=cos(a), s=sin(a);
        return mat2(c,-s,s,c);
    }

    float map(vec3 p){
        p.xz*= m(1.3);
        p.xy*= m(.4) ;
        vec3 q = p*3.5+t;
        return  p.x*p.y * length(p+vec3(sin(1.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.7 - 1.0 ;
    }

    void main(){
      vec2 p = gl_FragCoord.xy/iResolution.y - vec2(1.0,0.8) ;
      vec3 cl = vec3(0.8);
      float d = 5.5;
      for(int i=0; i<=5; i++) {
        vec3 p = vec3(0,.2,6.) + normalize(vec3(p, -3.0))*d ;
        float rz = map(p);
        float f =  clamp((rz - map(p+.1))*0.5*cos(iGlobalTime*.2)*p.x, -.1, .5 );
        vec3 l = vec3(0.1,0.2,0.4) + vec3(0.1, 2.5, 2.0)*f;
        cl = cl*l + (1.2-smoothstep(0.8, 2.5, rz))*.7*l;
        d += min(rz, 0.8 );
      }
      gl_FragColor = vec4(cl, 1.5);
    }
  `,
  });

  const geometry = new PlaneGeometry(1, 1);
  const mesh = new Mesh(geometry, material);

  uniforms.iResolution.value.x = window.innerWidth;
  uniforms.iResolution.value.y = window.innerHeight;

  window.addEventListener("resize", () => {
    uniforms.iResolution.value.x = window.innerWidth;
    uniforms.iResolution.value.y = window.innerHeight;
  });
  scene.add(mesh);

  //METAL LIQUIDE

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
    metalness: 1,
    roughness: 0,
    color: "#191919",
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
      renderer = new WebGLRenderer({
        canvas: experience.value,
        alpha: true,
        antialias: true,
      });
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
    gsap.from(pivot.rotation, { duration: 3.5, y: -20, ease: "power4.out" });
    //Position de départ
    gsap.from(pivot.position, { duration: 2.5, y: -5, ease: "power4.out" });
  });
  const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    // pivot.rotation.y += 0.015;
    requestAnimationFrame(loop);
    uniforms.iGlobalTime.value += clock.getDelta() *.5;
  };
</script>

<template>
  <main>
    <Modele3d />
    <div class="hero-elements">
      <div>
        <h1>
          <span class="prenom-nom-hero hero-span">Théo Florès</span>
        </h1>
      </div>
      <div>
        <span class="specialite-hero hero-span">UX/UI Designer</span>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
  import { gsap } from "gsap";
  // const {data:projets} = await useWpApi().getProjets<any>();

  onMounted(() => {
    function animateElement() {
      var tl = gsap.timeline();

      tl.to(".hero-span", {
        duration: 0.8,
        delay: 1.4,
        y: 0,
        ease: "expo.out",
        stagger: {
          amount: 1,
        },
      });
    }
    animateElement();
  });
</script>

<style lang="scss" scoped>
  .hero-elements {
    position: absolute;
    top: 35%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    pointer-events: none;

    div:nth-child(2) {
      margin-top: -40px;
    }

    .prenom-nom-hero {
      font-size: 12rem;
      text-align: center;
      color: white;
      font-family: "ClashDisplay-Variable";
      font-weight: 600;
      transition: all 0.5s ease;
      pointer-events: initial !important;

      &:hover {
        letter-spacing: 0.05em;
      }
    }
    .specialite-hero {
      font-size: 3rem;
      text-align: center;
      color: white;
      font-family: "ClashDisplay-Variable";
      font-weight: 500;
    }

    .hero-span {
      display: inline-block;
      transform: translateY(100%);
    }

    div {
      overflow: hidden;
    }
  }
</style>

<template>
  <nav class="w-full sticky top-0">
    <div class="flex justify-between px-60">
      <NuxtLink to="/" class="logo text-xl font-bold py-4">
        <svg
          id="logo-theo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-6 -8.5 100 100"
        >
          <path
            d="m37.14,56.53v-23.26s.33-4.76-3.68-4.76h-15.99s-8.76.31-8.98-13.14h68.09s.14,13.46-8.74,13.56c-8.88.1-18.43-2.58-18.11,6.35h16.48s2.55,13.3-17.12,14.72c0,0,1.36,17.7-13.17,19.7,0,0-4.15-19.7,13.17-19.7"
          />
        </svg>
      </NuxtLink>
      <ul class="flex gap-10 items-center">
        <li><NuxtLink to="/" class="py-7">Accueil</NuxtLink></li>
        <li><NuxtLink to="/projets" class="py-7">Projets</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>

<style lang="scss">
  nav {
    color: #ffffff;
  }

  #logo-theo {
    width: 60%;
    max-height: 100px;

    path {
      fill: $tertiary-color ;
      stroke: $primary-color;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.73px;
    }
  }
</style>

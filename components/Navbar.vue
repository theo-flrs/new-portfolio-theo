<template>
  <nav class="w-full sticky top-0">
    <div class="flex justify-between px-60">
      <NuxtLink to="/" class="logo text-xl font-bold py-7"
        >Théo Florès</NuxtLink
      >
      <ul class="flex gap-10 items-center">
        <li><NuxtLink to="/" class="py-7">Accueil</NuxtLink></li>
        <li><NuxtLink to="/projets" class="py-7">Projets</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>

<style>
  nav {
    background-color: #050505;
    color: #ffffff
  }
</style>

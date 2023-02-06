<template>
  <div class="col-span-1">
    <div v-if="image" class="w-full h-[180px] relative">
      <img
        :src="image"
        alt=""
        class="w-full h-full absolute object-cover"
      />
    </div>
    <div class="p-5">
      <h3 class="text-xl font-semibold mb-3">{{ title }}</h3>
      <p v-if="excerpt" class="text-sm mb-3">
        {{ excerpt }}
      </p>
      <NuxtLink :to="`projets/${slug}`">En savoir plus</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    title: string;
    image: string;
    excerpt?: string;
    slug: number;
  }>();
</script>

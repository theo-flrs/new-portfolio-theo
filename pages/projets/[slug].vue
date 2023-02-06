<template>
  <main>
    <section class="header container py-12 sm:py-24">
      <div class="titre-projet text-center mb-5">
        <h1 class="text-3xl sm:text-5xl font-bold">
          {{ projet.titre_du_projet }}
        </h1>
      </div>

      <div class="meta-projet text-center mb-10">
        <span class="mr-3">Écrit par Théo Florès </span>
        <span>Publié le 03/01/2023</span>
      </div>

      <div class="w-full h-[250px] sm:h-[400px] relative shadow-xl mb-10">
        <img
          src="https://images.unsplash.com/photo-1672753755413-5a6e9ef81e01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          class="absolute w-full h-full object-cover rounded overflow-hidden"
        />
      </div>

      <div>
        <div class="contenu-projet">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias unde,
          repudiandae pariatur provident illo facilis eos nam odit molestiae
          officiis velit, amet et! Minus aspernatur voluptatibus, debitis
          asperiores totam mollitia?
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
  const { params } = useRoute();
  const { data: projets } = await useWpApi().getProjet<any>(
    params.slug as string
  );
  const projet = projets.value.acf;
</script>

<template>
  <section class="container py-10">
    <div class="flex flex-wrap gap-5">
      <a
        v-for="projet in uniqueProjets"
        :key="projet.id"
        class="block py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
        >{{ projet.acf.categorie_du_projet }}</a
      >
    </div>
    
  </section>

  <section class="container">
    <div class="grid sm:grid-cols-3 gap-5">
      <ProjectCard
        v-for="projet in projets"
        :key="projet.id"
        :title="projet.acf.titre_du_projet"
        :excerpt="projet.acf.contexte_du_projet"
        :image="projet.acf.image_principale_du_projet.sizes.large"
        :slug="projet.id"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
  const { data: projets } = await useWpApi().getProjets<any>();

  const uniqueProjets = projets.value.filter(
    (projet: any, index: number, self: any) =>
      index ===
      self.findIndex(
        (t: any) => t.acf.categorie_du_projet === projet.acf.categorie_du_projet
      )
  );

</script>

export default () => {
  const config = useRuntimeConfig();
  const wpUri = config.public.wpUri;

  // Récupérer tous les projets
  const getProjets = async <T>() => useFetch<T>(`${wpUri}/wp-json/acf/v3/portfolio?per_page=100`);

  // Récupérer un seul projet
  const getProjet = async <T>(slug: string) =>
    useFetch<T>(`${wpUri}/wp-json/acf/v3/portfolio/${slug}`);

  return {
    getProjet,
    getProjets,
  };
};

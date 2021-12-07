const config = {
  apiUrl: "https://pokeapi.co/api/v2",
  maxPokeApipokemons: 10220,
  serverPokemonPuntoCom: {
    urlImgSmall: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail",
    urlImgLarge: "https://assets.pokemon.com/assets/cms2/img/pokedex/full",
    maxPokemons: 898,
  },
  serverSerebi: {
    urlImgSmall: "https://www.serebii.net/pokemongo/pokemon",
    urlImgLarge: "https://www.serebii.net/swordshield/pokemon",
    maxPokemons: 898,
  },
};

const dataByType = {
  normal: {
    name: "normal",
    class: "color-normal",
    color_rgba: "rgba(199, 180, 159, 0.6)",
    color_solid: "rgb(199, 180, 159)",
  },
  grass: {
    name: "césped",
    class: "color-grass",
    color_rgba: "rgba(155, 204, 80, 0.6)",
    color_solid: "rgb(155, 204, 80)",
  },
  poison: {
    name: "veneno",
    class: "color-poison",
    color_rgba: "rgba(185, 127, 201, 0.6)",
    color_solid: "rgb(185, 127, 201)",
  },
  flying: {
    name: "volador",
    class: "color-flying",
    color_rgba: "rgba(211, 224, 255, 0.6)",
    color_solid: "rgb(211, 224, 255)",
  },
  fire: {
    name: "fuego",
    class: "color-fire",
    color_rgba: "rgba(240, 128, 48, 0.6)",
    color_solid: "rgb(240, 128, 48)",
  },
  water: {
    name: "agua",
    class: "color-water",
    color_rgba: "rgba(130, 199, 232, 0.6)",
    color_solid: "rgb(130, 199, 232)",
  },
  bug: {
    name: "insecto",
    class: "color-bug",
    color_rgba: "rgba(175, 217, 164, 0.6)",
    color_solid: "rgb(175, 217, 164)",
  },
  electric: {
    name: "eléctrico",
    class: "color-electric",
    color_rgba: "rgba(238, 213, 53, 0.6)",
    color_solid: "rgb(238, 213, 53)",
  },
  ground: {
    name: "tierra",
    class: "color-ground",
    color_rgba: "rgba(213, 190, 122, 0.6)",
    color_solid: "rgb(213, 190, 122)",
  },
  fairy: {
    name: "hada",
    class: "color-fairy",
    color_rgba: "rgba(246, 191, 196, 0.6)",
    color_solid: "rgb(246, 191, 196)",
  },
  fighting: {
    name: "luchador",
    class: "color-fighting",
    color_rgba: "rgba(213, 103, 35, 0.6)",
    color_solid: "rgb(213, 103, 35)",
  },
  psychic: {
    name: "psíquico",
    class: "color-psychic",
    color_rgba: "rgba(247, 133, 200, 0.6)",
    color_solid: "rgb(247, 133, 200)",
  },
  rock: {
    name: "roca",
    class: "color-rock",
    color_rgba: "rgba(185, 177, 137, 0.6)",
    color_solid: "#b9b189",
  },
  steel: {
    name: "acero",
    class: "color-steel",
    color_rgba: "rgba(179, 178, 180, 0.6)",
    color_solid: "#b3b2b4",
  },
  ghost: {
    name: "fantasma",
    class: "color-ghost",
    color_rgba: "rgba(111, 112, 167, 0.6)",
    color_solid: "#6f70a7",
  },
  ice: {
    name: "hielo",
    class: "color-ice",
    color_rgba: "rgba(188, 225, 243, 0.6)",
    color_solid: "#bce1f3",
  },
  dragon: {
    name: "dragon",
    class: "color-dragon",
    color_rgba: "rgba(60, 159, 187, 0.6)",
    color_solid: "#3c9fbb",
  },
  dark: {
    name: "oscuro",
    class: "color-dark",
    color_rgba: "rgba(118, 112, 131, 0.6)",
    color_solid: "#767083",
  },
};

const statsConfig = {
  hp: { name: "Vida", type_progress: "bg-success" },
  attack: { name: "Ataque", type_progress: "bg-danger" },
  defense: { name: "Defensa", type_progress: "bg-primary" },
  "special-attack": {
    name: "Ataque especial",
    type_progress: "bg-danger progress-bar-striped",
  },
  "special-defense": {
    name: "Defensa especial",
    type_progress: "bg-pimary progress-bar-striped",
  },
  speed: { name: "Velocidad", type_progress: "bg-warning" },
};

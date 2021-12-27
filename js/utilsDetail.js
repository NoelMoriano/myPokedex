const getAllEvolutionsPokemon = (evolutions) => {
  evolutionsPokemon.push(getIdPokemon(evolutions.species.url));

  const getEvolution = async (evolves_to) => {
    if (evolves_to.length > 1) {
      const PokemonsIds = evolves_to.map((evolve) =>
        getIdPokemon(evolve.species.url)
      );

      evolutionsPokemon.push(PokemonsIds);
    } else {
      if (evolves_to[0]) {
        evolutionsPokemon.push(getIdPokemon(evolves_to[0].species.url));
        getEvolution(evolves_to[0].evolves_to);
      }
    }
  };

  getEvolution(evolutions.evolves_to);
};

const setEvolutionElement = (pokemon) => `
<div class="item-img-evolution">
<a href="../myPokedex/detail.html?id=${pokemon.id}" class="text-center">
  <img
    class="img-pokemon-evolution img-responsive"
    src="${getImagePokemon(
      pokemon.detail,
      "small",
      localStorage.getItem("imageType")
    )}"
    alt="pokemon"
/></a>
<h6 class="text-center name-pokemon">${pokemon.name}</h6>
</div>`;

const getIdPokemon = (url) =>
  url
    .split("/")
    .filter((url) => url)
    .pop();

const loadingPokemonHidden = () => {
  elementLoadingImagePokemon.classList.add("none");
};

const mapRenderStats = (elementRender, stats) => {
  return stats.map(({ base_stat, stat }) => {
    const statConfig_ = statsConfig[stat.name] || {};

    return (elementRender.innerHTML += `<div class="item-stat">
  <li class="list-group-item bg-primary-custom">
    <span class="title-stat">${statConfig_.name}:</span>  
    <div class="progress">
      <div
        class="progress-bar ${statConfig_.type_progress}"
        role="progressbar"
        style="width: ${base_stat}%"
        aria-valuenow="${base_stat}"
        aria-valuemin="0"
        aria-valuemax="1000"
      >
        ${base_stat}
      </div>
    </div>
  </li>
</div>`);
  });
};

const setBackgroundBody = (pokemonTypes) => {
  const amountPokemonTypes = pokemonTypes.length;
  const elementBody = document.body.style;

  switch (amountPokemonTypes) {
    case 1: {
      const colorOne = pokemonTypes[0].color_solid;
      elementBody.background = `linear-gradient(to right top, ${colorOne}, ${colorOne})`;
      break;
    }

    case 2: {
      const colorOne = pokemonTypes[0].color_solid;
      const colorTwo = pokemonTypes[1].color_solid;
      elementBody.background = `linear-gradient(to right top, ${colorOne}, ${colorTwo})`;
      break;
    }
    case 3: {
      const colorOne = pokemonTypes[0].color_solid;
      const colorTwo = pokemonTypes[1].color_solid;
      const colorThree = pokemonTypes[2].color_solid;
      elementBody.background = `linear-gradient(to right top, ${colorOne}, ${colorTwo},${colorThree})`;
      break;
    }
    default: {
      const colorOne = pokemonTypes[0].color_solid;
      elementBody.background = `linear-gradient(to right top, ${colorOne}, ${colorOne})`;
      break;
    }
  }
};

const getStatsForChart = (stats) => stats.map((stat) => stat.base_stat);

const pokemonNoFount = () => {
  elementImagePokemon.src = "./images/pokemon-no-found.png";
  elementImagePokemon.style.width = "10em";
  elementCardPokemonDetail.innerHTML = `<br/><h4>Lo sentimos no se encontro el pokemon...</h4><a href="../myPokedex/index.html">Regresar a inicio</a><br/>`;
  addClassName(elementLoadingSkeleton, "none");
  removeClassName(elementImagePokemon, "none");
  removeClassName(elementCardPokemonDetail, "none");
  loadingPokemonHidden();
};

const erroServer = () => {
  elementImagePokemon.src = "./images/500.png";
  elementImagePokemon.style.width = "10em";
  elementCardPokemonDetail.innerHTML = `<br/><h4>Lo sentimos tenemos problemas con el servidor, intentelo mas tarde...</h4><a href="../myPokedex/index.html">Regresar a inicio</a><br/>`;
  addClassName(elementLoadingSkeleton, "none");
  removeClassName(elementImagePokemon, "none");
  removeClassName(elementCardPokemonDetail, "none");
  loadingPokemonHidden();
};

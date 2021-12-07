const elementCardPokemonDetail = document.querySelector("#card-pokemon-detail");
const elementLoadingImagePokemon = document.querySelector(
  "#wrapper-loading-pokemon"
);
const elementImagePokemon = document.querySelector("#detail-image-pokemon");
const elementNamePokemon = document.querySelector("#detail-name-pokemon");
const elementDescriptionPokemon = document.querySelector(
  "#detail-description-pokemon"
);
const elementTypePokemon = document.querySelector("#detail-type-pokemon");
const elementListStats = document.querySelector("#detail-list-stats");
const elementContainerEvolutions = document.querySelector(
  "#container-evolutions"
);
const elementListEvolutions = document.querySelector("#list-evolutions");

//GET DATA FROM URL
const pokemonId = getParams("id");

let EVOLUTIONS_POKEMONS = [];

const getPokemon = async () => {
  try {
    //FETCH POKEMON
    const pokemon = await fetchPokemon(`${config.apiUrl}/pokemon/${pokemonId}`);

    //VALIDATE POKEMON exits
    if (!pokemon) {
      elementImagePokemon.src = "./images/pokemon-no-found.png";
      elementImagePokemon.style.width = "10em";
      elementCardPokemonDetail.innerHTML = `<br/><h4>Lo sentimos no se encontro el pokemon...</h4>`;
      elementImagePokemon.classList.remove("none");
      return loadingPokemon();
    }

    //SET IMAGE POKEMON
    setTimeout(() => {
      if (getImagePokemon(pokemon.detail, "large")) {
        elementImagePokemon.src = getImagePokemon(pokemon.detail, "large");
        elementImagePokemon.classList.remove("none");
      } else {
        elementImagePokemon.src = "./images/pokeball2.png";
        elementImagePokemon.classList.remove("none");
      }

      loadingPokemon();
    }, 1700);

    if (pokemon.id > config.serverSerebi.maxPokemons) {
      elementImagePokemon.classList.add("image-pixelated");
    }

    //SET NAME POKEMON
    elementNamePokemon.textContent = `${pokemon.name} - #${pokemon.detail.order}`;

    //GET AND SET DESCRIPTION POKEMON
    const descriptionEN = getDescription(pokemon, "en");

    const descriptionES = getDescription(pokemon, "es");

    if (descriptionES || descriptionEN) {
      elementDescriptionPokemon.textContent = descriptionES
        ? descriptionES
        : descriptionEN;
    }

    //SET POKEMON TYPES
    elementTypePokemon.innerHTML += mapRenderPokemonType(
      pokemon.detail.types,
      true
    );

    mapRenderSkills(elementListStats, pokemon.detail.stats);

    //VALIDATE AND SET EVOLUTIONS POKEMON
    if (
      !pokemon.evolutions ||
      pokemon.evolutions.chain.evolves_to.length <= 0
    ) {
      elementContainerEvolutions.classList.add("none");
    } else {
      getAllEvolutionsPokemon(pokemon.evolutions.chain);

      const getEvolutionsPokemon = EVOLUTIONS_POKEMONS.map(
        async (pokemonIds) => {
          if (typeof pokemonIds !== "string") {
            const pokemons = await pokemonIds.map(
              async (pokemonId) =>
                await fetchPokemon(`${config.apiUrl}/pokemon/${pokemonId}`)
            );

            const resultPromises = await Promise.all(pokemons);

            return resultPromises;
          } else {
            const pokemon = await fetchPokemon(
              `${config.apiUrl}/pokemon/${pokemonIds}`
            );

            return pokemon;
          }
        }
      );

      const resultPromisesEvolutionsPokemon = await Promise.all(
        getEvolutionsPokemon
      );

      resultPromisesEvolutionsPokemon.map((pokemon) => {
        if (pokemon.length > 1) {
          elementListEvolutions.innerHTML += `<div class="item-img-column">
                  ${pokemon.map((pokemon_) => setEvolutionElement(pokemon_))}
                </div>`;
        } else {
          elementListEvolutions.innerHTML += `<div class="item-img-row">
         ${setEvolutionElement(pokemon)}
          </div>`;
        }
      });
    }

    //GET BACKGROUNDS BY types
    const pokemonsTypes = pokemon.detail.types.map(
      (type_) => dataByType[type_.type.name]
    );

    setBackgroundBody(pokemonsTypes);
  } catch (e) {
    console.error("ErrorDetailsPokemon: ", e);
  }
};

const setEvolutionElement = (pokemon) => `
<div class="item-img-evolution">
<a href="../myPokedex/details.html?id=${pokemon.id}" class="text-center">
  <img
    class="img-pokemon-evolution img-responsive"
    src="${getImagePokemon(pokemon.detail)}"
    alt="pokemon"
/></a>
<h6 class="text-center name-pokemon">${pokemon.name}</h6>
</div>`;

const getAllEvolutionsPokemon = (evolutions) => {
  EVOLUTIONS_POKEMONS.push(getIdPokemon(evolutions.species.url));

  const getEvolution = async (evolves_to) => {
    if (evolves_to.length > 1) {
      const PokemonsIds = evolves_to.map((evolve) =>
        getIdPokemon(evolve.species.url)
      );

      EVOLUTIONS_POKEMONS.push(PokemonsIds);
    } else {
      if (evolves_to[0]) {
        EVOLUTIONS_POKEMONS.push(getIdPokemon(evolves_to[0].species.url));
        getEvolution(evolves_to[0].evolves_to);
      }
    }
  };

  getEvolution(evolutions.evolves_to);
};

const getIdPokemon = (url) =>
  url
    .split("/")
    .filter((url) => url)
    .pop();

const loadingPokemon = () => {
  elementLoadingImagePokemon.classList.add("none");
};

const mapRenderSkills = (elementRender, stats) => {
  return stats.map(({ base_stat, stat }) => {
    const statConfig_ = statsConfig[stat.name] || {};

    return (elementRender.innerHTML += `<div class="item-stat">
  <li class="list-group-item bg-primary-custom">
    ${statConfig_.name}:
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

getPokemon();

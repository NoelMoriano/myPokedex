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

const elementSpeech = document.querySelector("#item-speech");
const elementLoadingSkeleton = document.querySelector("#loading-skeleton");

//GET DATA FROM URL
const pokemonId = getParams("id");

let evolutionsPokemon = [];

const getPokemon = async () => {
  try {
    const synth = window.speechSynthesis;

    //FETCH POKEMON
    const pokemon = await fetchPokemon(`${config.apiUrl}/pokemon/${pokemonId}`);

    //VALIDATE POKEMON exits
    if (!pokemon) {
      return pokemonNoFount();
    }

    synth.cancel();

    const imagePokemon_ = getImagePokemon(
      pokemon.detail,
      "large",
      localStorage.getItem("imageType")
    );

    //SET IMAGE POKEMON
    setTimeout(() => {
      if (imagePokemon_) {
        elementImagePokemon.src = imagePokemon_;
        removeClassName(elementImagePokemon, "none");
        removeClassName(elementCardPokemonDetail, "none");
        addClassName(elementLoadingSkeleton, "none");
      } else {
        elementImagePokemon.src = "./images/pokeball2.png";
        removeClassName(elementImagePokemon, "none");
        addClassName(elementLoadingSkeleton, "none");
      }

      loadingPokemonHidden();
    }, 1500);

    if (pokemon.id > config.serverSerebi.maxPokemons) {
      elementImagePokemon.classList.add("image-pixelated");
    }

    //SET NAME POKEMON
    elementNamePokemon.innerHTML = `${pokemon.name} - #${pokemon.detail.order} <i class="fas fa-volume-up icon-volumen-up" id="volumen-up"></i>`;

    //SET POKEMON TYPES
    elementTypePokemon.innerHTML += mapRenderPokemonType(
      pokemon.detail.types,
      true
    );

    mapRenderStats(elementListStats, pokemon.detail.stats);

    setDataChart(
      getStatsForChart(pokemon.detail.stats),
      pokemon.detail.types[0].type
    );

    //GET AND SET DESCRIPTION POKEMON
    const descriptionEN = getDescription(pokemon, "en");

    const descriptionES = getDescription(pokemon, "es");

    if (descriptionES || descriptionEN) {
      const elementVolumenUp = document.querySelector("#volumen-up");

      const descriptionPokemon = descriptionES
        ? { lang: "es", description: descriptionES }
        : { lang: "en", description: descriptionEN };

      elementDescriptionPokemon.textContent = descriptionPokemon.description;

      elementVolumenUp.addEventListener("click", () =>
        speechVoice(pokemon.name, descriptionPokemon)
      );

      elementImagePokemon.addEventListener("click", () =>
        speechVoice(pokemon.name, descriptionPokemon)
      );

      elementSpeech.addEventListener("click", () =>
        speechVoice(pokemon.name, descriptionPokemon)
      );

      speechVoice(pokemon.name, descriptionPokemon);
    }

    //VALIDATE AND SET EVOLUTIONS POKEMON
    if (
      !pokemon.evolutions ||
      pokemon.evolutions.chain.evolves_to.length <= 0
    ) {
      elementContainerEvolutions.classList.add("none");
    } else {
      getAllEvolutionsPokemon(pokemon.evolutions.chain);

      const getEvolutionsPokemon = evolutionsPokemon.map(async (pokemonIds) => {
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
      });

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
    erroServer();
  }
};

window.addEventListener("load", () => getPokemon());

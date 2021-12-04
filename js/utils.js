//*****FETCH API******
const fetchApi = async (url) => {
  const response = await fetch(url);

  if (!response.ok) return null;

  const dataJson = await response.json();
  return await dataJson;
};

//*****FETCH POKEMON SINGLE*****
const fetchPokemon = async (pokemonUrl) => {
  const pokemonDetails = await fetchApi(pokemonUrl);

  if (!pokemonDetails) return null;

  const pokemonSpecies = await fetchApi(pokemonDetails.species.url);

  const pokemonEvolutions = await fetchApi(pokemonSpecies.evolution_chain.url);

  return {
    id: pokemonDetails.id,
    name: pokemonDetails.name,
    detail: pokemonDetails,
    species: pokemonSpecies,
    evolutions: pokemonEvolutions,
  };
};

const isVisibleSpinner = (elementSpinner, isVisible = true) => {
  if (isVisible) {
    elementSpinner.classList.add("visible");
    elementSpinner.classList.remove("none");
  } else {
    elementSpinner.classList.remove("visible");
    elementSpinner.classList.add("none");
  }
};

//*****ACTIVE BUTTONS SPINNER*****
const activeSpinnerInButton = (
  btnElement,
  isVisible = true,
  defaultText,
  loadingText = "Cargando..."
) => {
  //Spinner no visible
  if (!isVisible) {
    btnElement.disabled = false;
    return (btnElement.innerHTML = `<div>${defaultText}</div>`);
  }

  //Spinner visible
  btnElement.disabled = true;
  btnElement.innerHTML = `<div><span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      ${loadingText}</div>`;
};

//*****MAP RENDER POKEMON*****
const renderPokemonInfo = (pokemonInfo) => {
  listPokemons.innerHTML += `
        <li class="item-list d-flex ${colorType(
          pokemonInfo.detail.types[0].type.name
        )}">
        <img class="pokeball-icon-img" src="./images/pokeball-icon.jpeg"/> 
          <div class="m-3">
            <a href="../details.html?id=${pokemonInfo.detail.id}"
              ><img
                src="${getImagePokemon(pokemonInfo.detail)}"
                alt="pokemon"
                class="img-pokemon-list"
                id="img-pokemon-${pokemonInfo.id}"
            /></a>
          </div>
          <div class="description">
          <a href="../details.html?id=${pokemonInfo.detail.id}"
          > <h3>${pokemonInfo.detail.name}</h3></a>
            <div class="wrapper-pokemon-types">
            ${mapRenderPokemonType(pokemonInfo.detail.types)}
            </p>
          </div></li>`;
};

//Map render pokemon type
const mapRenderPokemonType = (types, activeBg = false) => {
  return types.map(
    (pokemonType) =>
      `<span class="item-type ${
        activeBg && colorType(pokemonType.type.name)
      }">${dataByType[pokemonType.type.name].name}</span>`
  );
};

//Return color pokemon type
const colorType = (typePokemon) => dataByType[typePokemon].class;

//GET DATA FROM URL
const getParams = (param) => {
  const url = new URL(location.href);
  return url.searchParams.get(param);
};

//GET DESCRIPTION
const getDescription = (pokemon, languageCode) => {
  const descriptionEN = pokemon.species.flavor_text_entries.find(
    (description) => description.language.name === languageCode
  ).flavor_text;
  return descriptionEN;
};

//GET IMAGE POKEMON
const getImagePokemon = (pokemon, sizeImage = "small") => {
  if (pokemon.id > config.serverSerebi.maxPokemons) {
    return pokemon.detail.sprites.front_default
      ? pokemon.detail.sprites.front_default
      : "./images/pokeball2.png";
  }

  const _sizeImage = sizeImage === "small" ? "urlImgSmall" : "urlImgLarge";

  const urlImageExtended = config.serverSerebi[_sizeImage];

  if (pokemon.id < 10) {
    return `${urlImageExtended}/00${pokemon.id}.png`;
  }
  if (pokemon.id < 100) {
    return `${urlImageExtended}/0${pokemon.id}.png`;
  } else {
    return `${urlImageExtended}/${pokemon.id}.png`;
  }
};

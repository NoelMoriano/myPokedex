const listPokemons = document.querySelector("#list-pokemons");
const elementSpinner = document.querySelector("#element-spinner");

let amountPokemons = 60;

//FUNCTION INITIAL APP
const initialApp = async (urlPagination) => {
  try {
    let dataPokemons = null;

    isVisibleSpinner(elementSpinner);

    //Reset list HTML
    listPokemons.innerHTML = "";

    //Get all pokemons
    dataPokemons = await fetchApi(
      urlPagination
        ? urlPagination
        : `${config.apiUrl}/pokemon?offset=0&limit=${amountPokemons}`
    );

    //Get info pokemons in promises
    const returnPokemonsWithInfo = await dataPokemons.results.map(
      async (pokemon) => await fetchPokemon(pokemon.url)
    );

    //Resolve promises info pokemon
    const resultPokemonsWithInfo = await Promise.all(returnPokemonsWithInfo);

    console.log("resultPokemonsWithInfo->", resultPokemonsWithInfo);

    //Validate isEmpty resultPokemonsWithInfo
    if (!resultPokemonsWithInfo) {
      return (listPokemons.innerHTML = `<h3>No existen datos disponibles<h3/>`);
    }

    //Order by id
    const viewPokemons = resultPokemonsWithInfo
      .filter((pokemon) => pokemon)
      .sort((a, b) => a.id - b.id);

    isVisibleSpinner(elementSpinner, false);

    //Render info pokemon
    viewPokemons.map((pokemon) => {
      renderPokemonInfo(pokemon);
    });
  } catch (e) {
    console.error(e);

    return (listPokemons.innerHTML =
      "<h3>Lo sentimos, ocurrio un error, vuelva a ingresar mas tarde...</h3>");
  } finally {
    isVisibleSpinner(elementSpinner, false);
  }
};

//INITIAL APP
initialApp();

const elementListPokemons = document.querySelector("#list-pokemons");
const elementSpinner = document.querySelector("#element-spinner");
const elementAmountPokemons = document.querySelector("#amount-pokemons");

let amountPokemons = 60;

//FUNCTION INITIAL APP
const initialApp = async (urlPagination) => {
  try {
    let dataPokemons = null;

    isVisibleSpinner(elementSpinner);

    //Reset list HTML
    elementListPokemons.innerHTML = "";

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

    //Validate isEmpty resultPokemonsWithInfo
    if (!resultPokemonsWithInfo) {
      return (elementListPokemons.innerHTML = `<h3>No existen datos disponibles<h3/>`);
    }

    //Order by id
    const viewPokemons = resultPokemonsWithInfo
      .filter((pokemon) => pokemon)
      .sort((a, b) => a.order - b.order);

    //Render info pokemon
    viewPokemons.map((pokemon) => {
      renderPokemonInfo(pokemon);
    });

    elementAmountPokemons.textContent = viewPokemons.length || 0;
  } catch (e) {
    console.error(e);

    return (elementListPokemons.innerHTML =
      "<h3>Lo sentimos, ocurrio un error, vuelva a ingresar mas tarde...</h3>");
  } finally {
    isVisibleSpinner(elementSpinner, false);
  }
};

//INITIAL APP
initialApp();

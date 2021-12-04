const formSearch = document.querySelector("#form-search");
const btnSearch = document.querySelector("#btn-search");

//SEARCH POKEMON
formSearch.addEventListener("submit", async (e) => {
  try {
    activeSpinnerInButton(btnSearch);

    e.preventDefault();
    const valueSearch = document
      .querySelector("#value-search")
      .value.toLowerCase()
      .trim();

    if (valueSearch) {
      const response = await fetch(`${config.apiUrl}/pokemon/${valueSearch}`);

      if (!response.ok) {
        return (listPokemons.innerHTML = `<h3>No se encontro "${valueSearch}", intente con otro nombre o id por favor...</h3>`);
      }

      listPokemons.innerHTML = "";

      const pokemonDetails = await response.json();

      const pokemonSpecies = await fetchApi(
        `${config.apiUrl}pokemon-species/${pokemonDetails.id}/`
      );

      const pokemonEvolutions = await fetchApi(
        `${config.apiUrl}evolution-chain/${pokemonDetails.id}/`
      );

      pokemonInfo = {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        detail: pokemonDetails,
        species: pokemonSpecies,
        evolutions: pokemonEvolutions,
      };

      console.log("pokemonInfoSearch->", pokemonInfo);

      renderPokemonInfo(pokemonInfo);
    } else {
      initialApp();
    }
  } catch (e) {
    console.error(e);

    return (listPokemons.innerHTML =
      "<h3>Ocurrio un error, intentelo mas tarde</h3>");
  } finally {
    activeSpinnerInButton(btnSearch, false, "Buscar");
  }
});

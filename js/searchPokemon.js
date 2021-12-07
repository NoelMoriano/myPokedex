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
        elementAmountPokemons.textContent = 0;
        elementListPokemons.style.display = "flex";
        return (elementListPokemons.innerHTML = `<h3>No se encontro "${valueSearch}", intente con otro nombre o id por favor...</h3>`);
      }

      elementListPokemons.innerHTML = "";
      elementListPokemons.style.display = "grid";

      const pokemonDetail = await response.json();

      const pokemonSpecies = await fetchApi(pokemonDetail.species.url);

      const pokemonEvolutions = await fetchApi(
        pokemonSpecies.evolution_chain.url
      );

      pokemonInfo = {
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        detail: pokemonDetail,
        species: pokemonSpecies,
        evolutions: pokemonEvolutions,
      };

      renderPokemonInfo(pokemonInfo);

      elementAmountPokemons.textContent = 1;
    } else {
      initialApp();
    }
  } catch (e) {
    console.error(e);

    elementListPokemons.style.display = "flex";

    return (elementListPokemons.innerHTML =
      "<h3>Ocurrio un error, intentelo mas tarde</h3>");
  } finally {
    activeSpinnerInButton(
      btnSearch,
      false,
      `<i class="fa fa-search"></i> Buscar`
    );
  }
});

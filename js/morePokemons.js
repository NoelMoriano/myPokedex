const btnMorePokemons = document.querySelector("#btn-more-pokemons");

//PAGINATION
btnMorePokemons.addEventListener("click", async () => {
  try {
    activeSpinnerInButton(btnMorePokemons);
    isVisibleSpinner(elementSpinner);

    setTimeout(async () => {
      amountPokemons = amountPokemons + 20;

      amountPokemons =
        amountPokemons >= config.max_pokemons
          ? config.max_pokemons
          : amountPokemons;

      await initialApp(
        `${config.apiUrl}/pokemon?offset=0&limit=${amountPokemons}`
      );

      isVisibleSpinner(elementSpinner, false);
      activeSpinnerInButton(btnMorePokemons, false, "Ver más...");
    }, 1500);
  } catch (e) {
    console.error("ErrorMorePokemons: ", e);
  }
});

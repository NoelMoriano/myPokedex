let iconPrev = document.querySelector("#icon-prev");
let iconNext = document.querySelector("#icon-next");

iconPrev.addEventListener("click", () => prevPokemon());

iconNext.addEventListener("click", () => nextPokemon());

document.addEventListener("keydown", (e) => {
  const keyCode = e.keyCode;
  if (keyCode === 37) {
    prevPokemon();
  }
  if (keyCode === 39) {
    nextPokemon();
  }
});

const prevPokemon = () =>
  (location.href = `../details.html?id=${
    +pokemonId <= 1 ? config.max_pokemons : +pokemonId - 1
  }`);

const nextPokemon = () =>
  (location.href = `../details.html?id=${
    +pokemonId >= config.max_pokemons ? 1 : +pokemonId + 1
  }`);

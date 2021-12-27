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
  (location.href = `../myPokedex/detail.html?id=${
    +pokemonId <= 1 ? config.maxPokeApipokemons : +pokemonId - 1
  }`);

const nextPokemon = () =>
  (location.href = `../myPokedex/detail.html?id=${
    +pokemonId >= config.maxPokeApipokemons ? 1 : +pokemonId + 1
  }`);

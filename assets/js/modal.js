const modal = document.getElementById("modal");

function configureModal() {
  const triggers = document.querySelectorAll("[data-modal]");

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", async function (event) {
      event.preventDefault();

      const pokemonId = trigger.dataset.pokemonId;
      const pokemon = await pokeApi.getPokemonDetailById(pokemonId);
      configureModalContainer(pokemon);

      modal.classList.add("open");

      const exitTriggers = modal.querySelectorAll(".modal-exit");
      exitTriggers.forEach(function (exitTrigger) {
        exitTrigger.addEventListener("click", function (event) {
          event.preventDefault();
          modal.classList.remove("open");
        });
      });
    });
  });
}

function configureModalContainer(pokemon) {
  const container = `
        <div class="modal-bg modal-exit"></div>
        <div class="modal-container pokemon ${pokemon.type}">
            <button class="modal-close modal-exit">X</button>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            <h2 class="name">${pokemon.name}</h2>
            ${pokemon?.abilities.join(" | ")}
            <ul class="stats">
                ${pokemon.stats?.map(
                  (stat) => `<li>${stat.name}: ${stat.value}`
                )}
            </ul>
        </div>
    `;

  modal.innerHTML = container;
}

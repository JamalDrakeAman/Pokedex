// -----------------------------------------------------------------------------------
//                                   Filter Functions
// -----------------------------------------------------------------------------------


function filterPokemons() {
    let search = document.getElementById('search-input').value;
    search = search.toLowerCase();
    let pokedex = document.getElementById('pokedex-container');

    if (search.length >= 3) {
        pokedex.innerHTML = '';
        renderFilterPokemons(search, pokedex);
    } else {
        pokedex.innerHTML = '';
        renderPokemon()
    }

}


function renderFilterPokemons(search, pokedex) {
    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let pokeDetail = pokemonDetails[i];
        if (pokemon.toLowerCase().includes(search)) {
            pokedex.innerHTML += renderPokemonHTML(i, pokemon);
            for (let d = 0; d < pokeDetail.types.length; d++) {
                const pokeType = pokeDetail.types[d];
                document.getElementById(`card-footer${i}`).innerHTML += renderPokemonTypeHTML(pokeType);
            }
        }
    }
}
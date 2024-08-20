// ---------------------------------------------------------------------------------------
//                               OverlayCard Functions
//----------------------------------------------------------------------------------------


async function showPokemonOverlayCardInfo(i, info) {
    let pokemonInfo = document.getElementById('overlaycard-poke-info');
    pokemonInfo.innerHTML = '';
    if (info == 'about') {
        pokemonInfo.innerHTML = aboutInfo(i);
    } else if (info == 'state') {
        pokemonInfo.innerHTML = stateInfo(i);
    } else if (info == 'moves') {
        pokemonInfo.innerHTML = movesInfo(i);
        renderMoves(i);
    } else if (info == 'evolutions') {
        pokemonInfo.innerHTML = await evolutionsInfo(i);
        showCurrentEvo()
    } else if (info == 'location') {
        pokemonInfo.innerHTML = locationInfo(i);
        getLocations(i);
    }
}


function aboutInfo(i) {
    let pokemonWeight = pokemonDetails[i].weight / 10;
    let pokemeonHeight = pokemonDetails[i].height / 10;
    return aboutInfoHTML(pokemonWeight, pokemeonHeight);
}


function stateInfo(i) {
    return stateInfoHTML(i);
}


function movesInfo() {
    return movesInfoHTML()
}


async function evolutionsInfo(i) {
    await loadAllEvolutions()
    let pokemonChain = findEvolutionChain(pokemons[i]);
    currentEvos = [];
    logEvolutionChain(pokemonChain)
    return evolutionsInfoHTML();
}


function locationInfo() {
    return locationInfoHTML();
}


function goForward(i) {
    if (i < pokemons.length - 1) {
        let currentPokemon = i + 1;
        showPokemonCard(currentPokemon);
    }
}


function goBackward(i) {
    if (i > 0) {
        let currentPokemon = i - 1;
        showPokemonCard(currentPokemon);
    }
}

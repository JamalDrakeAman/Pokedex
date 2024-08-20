// --------------------------------------------------------------------
//               Find and Show Evolutions Functions
//--------------------------------------------------------------------


// Hilfsfunktion, um ein Pokémon rekursiv in einer Kette zu finden
// Helper function to find a Pokémon in a chain recursively
function findInChain(chain, name) {
    if (chain.species.name === name) {
        return chain;
    }
    for (let evolve of chain.evolves_to) {
        const result = findInChain(evolve, name);
        if (result) {
            return result;
        }
    }
    return null;
}


// Iteriere durch alle Evolutionen, um das passende Pokémon zu finden
// Iterate through all evolutions to find the matching Pokémon
function findEvolutionChain(pokemonName) {
    for (let evolution of allEvolutions) {
        const result = findInChain(evolution.chain, pokemonName);
        if (result) {
            return result;
        }
    }
    return null; // Null zurückgeben, wenn das Pokémon nicht gefunden wird    // Return null if Pokémon is not found
}


// Rekursive Funktion zum Durchlaufen der Evolutionskette
function logEvolutionChain(chain) {
    currentEvos.push(chain.species.name)
    for (let evolve of chain.evolves_to) {
        logEvolutionChain(evolve);
    }
}


function showCurrentEvo() {
    for (let i = 0; i < currentEvos.length; i++) {
        let evo = currentEvos[i];
        document.getElementById('evolutions-info-box').innerHTML += showCurrentEvoHTML(evo);
    }
}

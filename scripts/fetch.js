// -----------------------------------------------------------
//                   Fetch Data Functions
// -------------------------------------------------------------


async function fetchPokemonData(path = `pokemon?offset=${offset}&limit=${loadLimit}`) {
    let response = await fetch(BASE_URL + path + '.json');
    let responseAsJson = await response.json();
    let allPokemonsData = responseAsJson.results

    let promise = allPokemonsData.map(pokemon => {
        return fetch(pokemon.url).then(response => response.json());
    })

    let results = await Promise.all(promise);
    pokemonDetails.push(...results);
}


//Laden aller Evolutionsketten
async function loadAllEvolutions() {
    let promises = [];
    for (let i = 1; i < 100; i++) {
        promises.push(fetch('https://pokeapi.co/api/v2/evolution-chain/' + i).then(r => r.json()));
    }
    allEvolutions = await Promise.all(promises);
}


//Laden der Locations
async function getLocations(i) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/location/${i + 1}`);
        let responseAsJson = await response.json();
        document.getElementById('location-name').innerHTML = `${responseAsJson.name}`
    }
    catch {
        console.log('Pokemon Daten nicht gefunden');
    }
}

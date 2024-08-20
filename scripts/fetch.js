// -----------------------------------------------------------
//                   Fetch Data Functions
// -------------------------------------------------------------

async function fetchPokemonData(path = "") {
    let response = await fetch(BASE_URL + loadLimit + path + '.json');
    let responseAsJson = await response.json();
    let allPokemonsData = responseAsJson.results

    allPokemonsData.forEach(pokemon => {
        pokemons.push(pokemon.name)
        pokemonsURL.push(pokemon.url)

    });
}


async function fetchPokemeonDetails() {
    let fetchPromises = pokemonsURL.map(url => fetch(url).then(response => response.json()));
    await Promise.all(fetchPromises)
        .then(results => {
            results.forEach(pokeDetail => {
                pokemonDetails.push(pokeDetail)
            });
        })
        .catch(error => {
            console.error('Es gab ein Problem mit einer der Fetch-Anfragen', error);
        })
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

let loadLimit = 26;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=`
let pokemons = [];
let pokemonsURL = [];
let pokemonDetails = [];
let allEvolutions = [];
let currentEvos = [];


// -----------------------------------------------------------
//                   Start Code
// -------------------------------------------------------------

async function init() {
    document.getElementById('loadingScreen').classList.remove('d-none');
    await fetchPokemonData();
    await fetchPokemeonDetails();
    document.getElementById('loadingScreen').classList.add('d-none');
    renderPokemon()
}


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


// ------------------------------------------------------------
//                      Render Functions
// ------------------------------------------------------------


function renderPokemon() {
    let pokedexContainer = document.getElementById('pokedex-container');
    pokedexContainer.innerHTML = '';
    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let pokeDetail = pokemonDetails[i];
        pokedexContainer.innerHTML += renderPokemonHTML(i, pokemon);
        for (let d = 0; d < pokeDetail.types.length; d++) {
            const pokeType = pokeDetail.types[d];
            document.getElementById(`card-footer${i}`).innerHTML += renderPokemonTypeHTML(pokeType);
        }
    }
}


function renderOverlayCard(i) {
    let OverlayCard = document.getElementById('pokemon-card-overlay-container');
    OverlayCard.innerHTML = renderOverlayCardHTML(i);
    let pokemonTypes = document.getElementById('overlaycard-types');
    pokemonTypes.innerHTML = '';
    for (let index = 0; index < pokemonDetails[i].types.length; index++) {
        let detail = pokemonDetails[i].types[index];
        pokemonTypes.innerHTML += renderOverlayCardTypeHTML(detail);
    }
    showPokemonOverlayCardInfo(i, 'about')
}


function renderMoves(i) {
    let moves = pokemonDetails[i].moves
    for (let m = 0; m < moves.length; m++) {
        let move = moves[m];
        document.getElementById('moves-list').innerHTML += `<li>${move.move.name}</li>`
    }
}


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


// -----------------------------------------------------------------------------------
//                                   Helper Functions
// -----------------------------------------------------------------------------------

function showPokemonCard(i) {
    renderOverlayCard(i)
    document.getElementById('pokemon-card-overlay-bg').style.display = 'flex';
    document.getElementById('body').style.overflowY = 'hidden';
    document.getElementById('goForward').addEventListener('click',
        function (event) {
            event.stopPropagation();
        });
    document.getElementById('goBack').addEventListener('click',
        function (event) {
            event.stopPropagation();
        });
    document.getElementById('pokemon-card-overlay-bg').addEventListener('click', function (event) {
        const dialog = document.getElementById('pokemon-card-overlay');
        if (!dialog.contains(event.target)) {
            document.getElementById('pokemon-card-overlay-bg').style.display = 'none';
            document.getElementById('body').style.overflowY = 'visible';
        }
    });
}


function closeOverlayCard(){
    document.getElementById('pokemon-card-overlay-bg').style.display = 'none';
}

// Wandelt die zahl in ein string un füllt bis auf die 3te stelle mit 0
function formatNumber(number) {
    return number.toString().padStart(3, '0');
}



// Erhöht die ladezahl um 25  und löscht die alten daten des arrays
function loadMorePokemon() {
    let loadMore = 25;
    if (loadLimit < 150) {
        loadLimit = loadLimit + loadMore
        if (loadLimit == 151) {
            document.getElementById("poke-load-bt").classList.add('d-none');
        }
    }
    pokemons.splice(0, pokemons.length);
    pokemonsURL.splice(0, pokemonsURL.length);
    pokemonDetails.splice(0, pokemonDetails.length);
    init();
}
// Erhöht die ladezahl auf 151 und löscht die alten daten des arrays
function loadAllPokemon() {
    loadLimit = 151
    document.getElementById("poke-load-bt").classList.add('d-none');
    document.getElementById("load-all-bt").classList.add('d-none');
    pokemons.splice(0, pokemons.length);
    pokemonsURL.splice(0, pokemonsURL.length);
    pokemonDetails.splice(0, pokemonDetails.length);
    init();
}


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








let offset = 0;
let loadLimit = 26;
let BASE_URL = `https://pokeapi.co/api/v2/`
let pokemonDetails = [];
let allEvolutions = [];
let currentEvos = [];


// -----------------------------------------------------------
//                   Start Code
// -------------------------------------------------------------

async function init() {
    document.getElementById('loadingScreen').classList.remove('d-none');
    await fetchPokemonData();
    // await fetchPokemeonDetails();
    document.getElementById('loadingScreen').classList.add('d-none');
    renderPokemon()
}


// ------------------------------------------------------------
//                      Render Functions
// ------------------------------------------------------------

function renderPokemon() {
    let pokedexContainer = document.getElementById('pokedex-container');
    pokedexContainer.innerHTML = '';
    for (let i = 0; i < pokemonDetails.length; i++) {
        let pokeDetail = pokemonDetails[i];
        pokedexContainer.innerHTML += renderPokemonHTML(i, pokeDetail.name);
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


function closeOverlayCard() {
    document.getElementById('pokemon-card-overlay-bg').style.display = 'none';
    document.getElementById('body').style.overflowY = 'visible';
}


// Wandelt die zahl in ein string un füllt bis auf die 3te stelle mit 0
function formatNumber(number) {
    return number.toString().padStart(3, '0');
}


// Erhöht die ladezahl um 25  und löscht die alten daten des arrays
function loadMorePokemon() {
    let loadMore = 25;
    if (pokemonDetails.length < 150) {
        offset = pokemonDetails.length
        loadLimit = loadMore
        init();
    } 
    if (pokemonDetails.length + loadMore > 150){
        document.getElementById("poke-load-bt").classList.add('d-none');
        document.getElementById("load-all-bt").classList.add('d-none');
    }
}


// Erhöht die ladezahl auf 151 und löscht die alten daten des arrays
function loadAllPokemon() {
    loadLimit = 151 - pokemonDetails.length;
    offset = pokemonDetails.length
    document.getElementById("poke-load-bt").classList.add('d-none');
    document.getElementById("load-all-bt").classList.add('d-none');
    init();
}









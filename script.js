let BASE_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
let pokemons = [];
let pokemonsURL = [];
let pokemonDetails = [];

async function init() {
    await fetchPokemonData();
    await fetchPokemeonDetails();
    renderPokemon()
}

async function fetchPokemonData(path = "") {
    let response = await fetch(BASE_URL + path + '.json');
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


function renderPokemon() {

    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let pokeDetail = pokemonDetails[i]

        console.log(pokeDetail);

        document.getElementById('pokedex-container').innerHTML += `
        <div id="pokemon-card${i}" class="pokemon-card" onclick="showPokemonCard(${i})" style="background-image: url(./imgs/type-background/background-${pokemonDetails[i].types[0].type.name}.png)">
            <div class="card-head ${pokemonDetails[i].types[0].type.name}">
                <p class="txt-wh txt-bd">#${formatNumber(i + 1)}</p>
                <p class="txt-wh txt-bd">${pokemon}</p>
            </div>
        
            <div class="card-detail">
            
                <div class="poke-img-box">
                     <img class="poke-img" src="./imgs/pokemons/${pokemon}.gif" alt="">
                </div>
            
                 <div id="card-footer${i}" class="card-types">
                
                 </div>

            </div>     

        </div>`;

        for (let d = 0; d < pokeDetail.types.length; d++) {
            const pokeType = pokeDetail.types[d];

            document.getElementById(`card-footer${i}`).innerHTML += `
                <div class="poke-card-type-box ${pokeType.type.name}">
                    <img class="card-type-img" src="./imgs/type-icon/${pokeType.type.name}.png" alt="">
                    <p class="txt-wh">${pokeType.type.name}</p>
                </div>
            `
        }

    }


}

// Wandelt die zahl in ein string un füllt bis auf die 3te stelle mit 0
function formatNumber(number) {
    return number.toString().padStart(3, '0');
}


function showPokemonCard(i) {
    showPokemonCardDetails(i)
    document.getElementById('pokemon-card-overlay-bg').style.display = 'flex';

    document.getElementById('pokemon-card-overlay-bg').addEventListener('click', function (event) {
        const dialog = document.getElementById('pokemon-card-overlay');
        if (!dialog.contains(event.target)) {
            document.getElementById('pokemon-card-overlay-bg').style.display = 'none';
        }
    });

}

function showPokemonCardDetails(i) {
    let pokemonId = document.getElementById('overlaycard-id');
    let pokemonImg = document.getElementById('overlaycard-img');
    let pokemonName = document.getElementById('overlaycard-name');
    let pokemonTypes = document.getElementById('overlaycard-types');
    let pokemonNavbar = document.getElementById('overlaycard-navbar');
    let pokemonCard = document.getElementById('pokemon-card-overlay');

    pokemonId.innerHTML = `#${formatNumber(i + 1)}`;
    pokemonImg.src = `./imgs/pokemons/${pokemons[i]}.gif`;
    pokemonName.innerHTML = `${pokemons[i]}`;

    pokemonTypes.innerHTML = '';
    for (let index = 0; index < pokemonDetails[i].types.length; index++) {
        let detail = pokemonDetails[i].types[index];
        console.log(detail);
        pokemonTypes.innerHTML += `
        <div class="overlaycard-type-box">
         <img class="overlay-type-img" src="./imgs/type-icon/${detail.type.name}.png" alt="">
         <p class="overlay-type-text">${detail.type.name}</p>
        </div>
        `
        pokemonCard.style.backgroundImage = `url(./imgs/type-background/background-${pokemonDetails[i].types[0].type.name}.png)`;
    }


}
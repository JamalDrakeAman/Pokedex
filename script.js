let BASE_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
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
        <div id="pokemon-card${i}" class="pokemon-card" onclick="showPokemonCard(${i})">
            <div class="card-head">
                <p class="poke-id">#${i + 1}</p>
                <p class="poke-name">${pokemon}</p>
            </div>
            <img class="poke-img" src="" alt="">
            <div id="card-footer${i}" class="card-footer">
                
            </div>

        </div>`;

        pokeDetail.types.forEach(typess,i => {

            let lengthOfTypes = typess[i]
            document.getElementById(`card-footer${i}`).innerHTML = `
                <div>
                    <img class="card-skills-img" src="" alt="">
                    <p class="poke-type">${lengthOfTypes.type.name}</p>
                </div>
            `
        })
    }
}

function showPokemonCard(i) {
    document.getElementById('show-pokemon-overlay-background').classList.add('d-flex')
}

function closePokemonCard() {
    document.getElementById('show-pokemon-overlay-background').addEventListener("click", closePokemonCard).classList.remove('d-flex')
}
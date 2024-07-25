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
        <div id="pokemon-card${i}" class="pokemon-card" onclick="showPokemonCard(${i})">

           <div class="pokemon-card-bg" style="background-image: url(./imgs/type-background/background-${pokemonDetails[i].types[0].type.name}.png)"></div>

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

function renderOverlayCard(i) {
    let OverlayCard = document.getElementById('pokemon-card-overlay-container');
    OverlayCard.innerHTML = `
    <div id="pokemon-card-overlay-bg" class="pokemon-card-overlay-bg">
            <div id="pokemon-card-overlay" class="pokemon-card-overlay" style="background-image: url(./imgs/type-background/background-${pokemonDetails[i].types[0].type.name}.png)">

                <div class="overlaycard-header">
                     <div class="overlaycard-name-container">
                        <p class="overlaycard-id">#${formatNumber(i + 1)}</p>
                        <p class="overlaycard-name">${pokemons[i]}</p>
                     </div>

                     <div id="overlaycard-types" class="overlaycard-types">

                      </div>

                </div>

                <img class="overlaycard-img" src="./imgs/pokemons/${pokemons[i]}.gif" alt="">

                

                <div class="overlaycard-info-container">

                   <div class="next-pokemon-container">
                    <img id="goBack" class="next-icon" onclick="goBackward(${i})" src="./imgs/icons/left-icon.png" alt="">
                    <img id="goForward" class="next-icon" onclick="goForward(${i})" src="./imgs/icons/right-icon.png" alt="">
                   </div>
                

                    <div id="overlaycard-navbar" class="overlaycard-navbar">
                        <button onclick="showPokemonOverlayCardInfo(${i},'about')" class="overlaycard-info-bt">About</button>
                        <button onclick="showPokemonOverlayCardInfo(${i},'state')" class="overlaycard-info-bt">State</button>
                        <button onclick="showPokemonOverlayCardInfo(${i},'moves')" class="overlaycard-info-bt">Moves</button>
                        <button onclick="showPokemonOverlayCardInfo(${i},'evolutions')" class="overlaycard-info-bt">Evolutions</button>
                        <button onclick="showPokemonOverlayCardInfo(${i},'location')" class="overlaycard-info-bt">Location</button>
                    </div>

                    <div id="overlaycard-poke-info" class="overlaycard-poke-info">

                    </div>

                </div>
            </div>
        </div>
    `
    let pokemonTypes = document.getElementById('overlaycard-types');

    pokemonTypes.innerHTML = '';
    for (let index = 0; index < pokemonDetails[i].types.length; index++) {
        let detail = pokemonDetails[i].types[index];
        console.log(detail);
        pokemonTypes.innerHTML += `
        <div class="overlaycard-type-box ${detail.type.name}">
         <img class="overlay-type-img" src="./imgs/type-icon/${detail.type.name}.png" alt="">
         <p class="overlay-type-text">${detail.type.name}</p>
        </div>
        `
    }
    showPokemonOverlayCardInfo(i, 'about')
}

// Wandelt die zahl in ein string un füllt bis auf die 3te stelle mit 0
function formatNumber(number) {
    return number.toString().padStart(3, '0');
}


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

function goForward(i) {
    let currentPokemon = i + 1;
    showPokemonCard(currentPokemon);
}

function goBackward(i) {
    let currentPokemon = i - 1;
    showPokemonCard(currentPokemon);
}

function showPokemonOverlayCardInfo(i, info) {
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
        pokemonInfo.innerHTML = evolutionsInfo(i);
    } else if (info == 'location') {
        pokemonInfo.innerHTML = locationInfo(i);
    }
}

function aboutInfo(i) {
    let pokemonWeight = pokemonDetails[i].weight / 10;
    let pokemeonHeight = pokemonDetails[i].height / 10;
    return `<div class="about-info-box">
                            <div class="info-category">
                                <p><img src="./imgs/icons/weight-icon.png" alt="">Weight</p>
                                <p>${pokemonWeight}kg</p>
                            </div>
                            <div class="split-box"></div>
                            <div class="info-category">
                                <p><img src="./imgs/icons/height-icon.png" alt="">Height</p>
                                <p>${pokemeonHeight}m</p>
                            </div>
                        </div>`;
}

function stateInfo(i) {
    return `<div class="state-info-box">
                            <table>
                                <tr>
                                    <td>HP</td>
                                    <td>${pokemonDetails[i].stats[0].base_stat}</td>
                                    <td>  <div class="status-bar"> 
                                    <div class="status" style="width:${pokemonDetails[i].stats[0].base_stat}%"></div> 
                                    </div></td>
                                </tr>
                                <tr>
                                    <td>Attack</td>
                                    <td>${pokemonDetails[i].stats[1].base_stat}</td>
                                    <td><div class="status-bar">
                                    <div class="status" style="width:${pokemonDetails[i].stats[1].base_stat}%"></div>
                                    </div></td>
                                </tr>
                                <tr>
                                    <td>Defense</td>
                                    <td>${pokemonDetails[i].stats[2].base_stat}</td>
                                    <td><div class="status-bar">
                                    <div class="status" style="width:${pokemonDetails[i].stats[2].base_stat}%"></div>
                                    </div></td>
                                </tr>
                                <tr>
                                    <td>Sp.Atk</td>
                                    <td>${pokemonDetails[i].stats[3].base_stat}</td>
                                    <td><div class="status-bar">
                                    <div class="status" style="width:${pokemonDetails[i].stats[3].base_stat}%"></div>
                                    </div></td>
                                </tr>
                                <tr>
                                    <td>Sp.Def</td>
                                    <td>${pokemonDetails[i].stats[4].base_stat}</td>
                                    <td><div class="status-bar">
                                    <div class="status" style="width:${pokemonDetails[i].stats[4].base_stat}%"></div>
                                    </div></td>
                                </tr>
                                <tr>
                                    <td>Speed</td>
                                    <td>${pokemonDetails[i].stats[5].base_stat}</td>
                                    <td><div class="status-bar">
                                    <div class="status" style="width:${pokemonDetails[i].stats[5].base_stat}%"></div>
                                    </div></td>
                                </tr>
                            </table>
                        </div>`;
}


function renderMoves(i){
    let moves = pokemonDetails[i].moves
    for (let m = 0; m < moves.length; m++) {
        let move = moves[m];

        document.getElementById('moves-list').innerHTML += `<li>${move.move.name}</li>`


    }
}

function movesInfo(i) {
    

    return `<div class="moves-info-box">
                    
                        <ul id="moves-list">
                        
                        </ul>

                    </div>`;
}

function evolutionsInfo() {
    return ` <div class="evolutions-info-box">

                        <div class="evolutions-box">
                            <img class="evo-img" src="" alt="">
                            <div class="evo-name-box">
                                <p>PokeName</p><p>pokeID</p>
                            </div>
                            <div class="evo-types-box">
                                <p>Grass</p>
                                <p>poison</p>
                            </div>

                        </div>

                        <div class="evolutions-box">
                            <img class="evo-img" src="" alt="">
                            <div class="evo-name-box">
                                <p>PokeName</p><p>pokeID</p>
                            </div>
                            <div class="evo-types-box">
                                <p>Grass</p>
                                <p>poison</p>
                            </div>

                        </div>

                        <div class="evolutions-box">
                            <img class="evo-img" src="" alt="">
                            <div class="evo-name-box">
                                <p>PokeName</p><p>pokeID</p>
                            </div>
                            <div class="evo-types-box">
                                <p>Grass</p>
                                <p>poison</p>
                            </div>

                        </div>


                    </div>`
}

function locationInfo() {

}
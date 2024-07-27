function renderPokemonHTML(i, pokemon) {
    return `
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

        </div>`
}


function renderPokemonTypeHTML(pokeType) {
    return `
                <div class="poke-card-type-box ${pokeType.type.name}">
                    <img class="card-type-img" src="./imgs/type-icon/${pokeType.type.name}.png" alt="">
                    <p class="txt-wh">${pokeType.type.name}</p>
                </div>
            `
}


function renderOverlayCardHTML(i) {
    return `
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
}


function renderOverlayCardTypeHTML(detail) {
    return `
        <div class="overlaycard-type-box ${detail.type.name}">
         <img class="overlay-type-img" src="./imgs/type-icon/${detail.type.name}.png" alt="">
         <p class="overlay-type-text">${detail.type.name}</p>
        </div>
        `
}


function aboutInfoHTML(pokemonWeight, pokemeonHeight) {
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


function stateInfoHTML(i) {
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


function movesInfoHTML() {
    return `<div class="moves-info-box">
                        <ul id="moves-list">
                        </ul>
            </div>`;
}


function evolutionsInfoHTML() {
    return ` <div class="evolutions-info-box" id="evolutions-info-box">
                    </div>`
}


function showCurrentEvoHTML(evo) {
    return `
                        <div class="evolutions-box">
                            <img class="evo-img" src="./imgs/pokemons/${evo}.gif" alt="">
                            <div class="evo-name-box">
                                <p>${evo}</p>
                            </div>
                        </div>
        `
}


function locationInfoHTML(){
return `
    <div class="location-info-box">
        <p id="location-name"></p>
    </div>
    `
}
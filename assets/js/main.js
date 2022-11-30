const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.getElementById('content');

const maxRecords = 151
const limit = 8
let offset = 0;
let listaPokemons = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span> 
            <span class="name">${pokemon.name}</span>
              

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

                <img onclick="openDetails(${pokemon.number})" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        
                     
        </li>
        
    `
}

function openDetails(number) {
    for(let pokemon of listaPokemons) {
        if (pokemon.number == number) {
            console.log(pokemon);

            var newHtml =  `
                
            

                <div class="pokemon-details">
                    <div class="barra-topo">
                        <div class="btn-voltar"><a href="index.html"><i class="fa-solid fa-arrow-left"></i></a><br></div>
                        <div class="div-number"><span class="number">#${pokemon.number}</span></div>
                    </div> 
                     
                    <div class="detail">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div> 

                    <div class="name">${pokemon.name}</div>

                    <div class="about">
                        <p>Descrição</p>
                        <div class="detail-types">
                            Tipo(s): ${pokemon.types.map((type) => `<div>${type}</div>`).join('')}
                        </div>  

                        <div class="detail-imc">
                            <div class="div-height"><div class="height">Altura: <span>${pokemon.height}</span></div></div>
                            <div class="div-weight"><div class="weight">Peso: <span>${pokemon.weight}</span></div></div> 
                        </div>
                                
                        
                    </div>

                </div>                
            `;

            content.innerHTML = newHtml;
        }
    }
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml;
        Array.prototype.push.apply(listaPokemons, pokemons);
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
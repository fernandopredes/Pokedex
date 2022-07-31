const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__img');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    searchPokemon = data.id;
  }else {
    pokemonName.innerHTML = 'Not Found )='
    pokemonNumber.innerHTML = '404'
    pokemonImage.src = './images/ghost.png'
  }
}

form.addEventListener('submit', (event)=> {
  event.preventDefault()
  renderPokemon(inputSearch.value.toLowerCase());
  inputSearch.value = '';
})

btnPrev.addEventListener('click', ()=>{
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
  }

})

btnNext.addEventListener('click', ()=>{
  if (searchPokemon <= 648) {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
  }
})

renderPokemon(searchPokemon);


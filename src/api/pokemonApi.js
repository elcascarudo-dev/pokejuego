import axios from 'axios'


const pokemonApi = axios.create({
  
  // https://pokeapi.co/api/v2/pokemon/1
  baseURL: 'https://pokeapi.co/api/v2/pokemon'

})


export default pokemonApi
<template>

  <div v-if="!pokemon"> Espere por favor...</div>
  <div v-else>
    <h1>¿Quien es este pokemon?</h1>
    <!-- //Imagen del pokemon -->
    <PokemonPicture 
                      :pokemonId="pokemon.id" 
                      :showPokemon="showPokemon" 
    />
    <!-- //Opciones -->
    <!-- Escucho el evento 'selection' -> @selection que envia el componente hijo -->
    <PokemonOptions 
                    :pokemons="pokemonArr" 
                    @selection="checkAnswer"
    />

    <template v-if="showAnswer">
      <h2>{{ message }}</h2>
      
      <button @click="newGame">
        Nuevo Juego
      </button>
    </template>

  </div>


  
</template>

<script>

  import PokemonOptions from '@/components/PokemonOptions'
  import PokemonPicture from '@/components/PokemonPicture'

  import getPokemonOptions from '../helpers/getPokemonOptions'



  export default {

    components:{
      PokemonOptions,
      PokemonPicture
    },

    data() {
      return{
        pokemonArr: [],
        pokemon: null,
        showPokemon: false,
        showAnswer: false,
        message: ''
      }
    },

    methods: {

      async mixPokemonArray() {
        this.pokemonArr = await getPokemonOptions()

        const rndInt = Math.floor( Math.random() *4 )
        this.pokemon = this.pokemonArr[ rndInt ]
      },

      checkAnswer( pokemonId ) {
        // @selection="checkAnswer"
        // Si queremos resivir el evento en la posision que nosotros queremos lo podemos definir asi:
        // @selection="checkAnswer( 1, $event )"
        this.showPokemon = true
        this.showAnswer = true

        if( this.pokemon.id === pokemonId ) {
          this.message = 'Correcto!!!'
        }else{
          this.message = `Opsss!! era ${ this.pokemon.name }`
        }

      },

      newGame() {

        this.pokemonArr    = []
        this.showPokemon   = false
        this.showAnswer    = false
        this.pokemon       = null
        
        this.mixPokemonArray()
      }

    },

    //hooks de ciclos de vida de los componentes
    mounted() {
      this.mixPokemonArray()
    }


  }
</script>

<style>

</style>
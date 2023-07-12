import { useEffect, useState } from 'react'
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { 
  AppBar, 
  Toolbar, 
  Grid, 
  CircularProgress,
  Typography,
  TextField,
} from '@mui/material';
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search';
import styles from '../css/pokedex.module.css';

/**En Este contenedor use Emotion que viene incluido en MUI para dar estilo, en los demas componenetes uso estilos desde modulos de css puedo trabajar ambos sin problema*/

const Container = styled.div`
  display: flex;
  background-color: rgba(70, 68, 68, 0.1); 
  padding-left: "20px";
  padding-right: "20px";
  margin-top: 5px;
  margin-bottom: 5px;
`


const Pokedex = () => {

  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  const handleSearch = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
     /**En esta peticion use Axios en la individual use Fetch */

    axios.get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
    .then(res => {
      const { data } = res;
      const { results } = data;

      const newPokemonData = {};

      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }
      })

      setPokemonData(newPokemonData);

    })
    .catch(error => {
      console.error(error);
    });
  
  }, [])
  
  const isEmpty = Object.keys(pokemonData).length === 0 ? true : false;

  return (
    <>
        <AppBar position='static'>
            <Toolbar>
              <Container>
                <SearchIcon className={styles.icono}/>
                <TextField 
                  className={styles.textarea}
                  label="Pokemon"
                  variant='standard'
                  onChange={handleSearch}
                  />
              </Container>
            </Toolbar>
        </AppBar>

        <Typography variant='h1' className={styles.titulo}>PRIMERA GENERACIÓN</Typography>

        {!isEmpty ? (
          <Grid container spacing={2} className={styles.pokedexContainer}>
            
              
            {
              Object.keys(pokemonData).map(pokemonId => (

                pokemonData[pokemonId].name.includes(filter) &&

                <PokemonCard
                  key={pokemonId}
                  pokemonId={pokemonId}
                  pokemonData={pokemonData}
                />
              ))
            }
          </Grid>
        ) : (
          <div className={styles.carga}>
            <CircularProgress color="warning"/>
          </div>
        )}
        

    </>
  )
}

export default Pokedex
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Typography,
  CircularProgress,
  Button
 } from '@mui/material';
import { capsFirst } from '../helpers';
import styles from '../css/pokemon.module.css';



const Pokemon = () => {

    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
      /**Usando peticion con fetch en lugar de axios */
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
          setPokemon(data);
        })
        .catch(error => {
          console.error(error);
  });
    }, [pokemonId])
    

    const generadorPokemon = () => {

      const { name, id, species, height, weight, types, sprites } = pokemon;
      const imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      const { front_default } = sprites;

      return (
        <>
          <Typography variant='h1' className={styles.titulo}>
            {`${id}.`}{capsFirst(name)}
            <img src={front_default} alt={`Sprite ${name}`} />
          </Typography>
          <img src={imagenUrl} alt={`Imagen ${name}`} style={{ width: '300px', height: '300px' }} className={styles.imagen}/>
          <Typography variant='h3' className={styles.info}>Pokemon Info</Typography>
          
          <Typography className={styles.centertext}><span className={styles.bold}>Especie:</span> {species.name}</Typography>
          <Typography className={styles.centertext}><span className={styles.bold}>Altura:</span> {height}</Typography>
          <Typography className={styles.centertext}><span className={styles.bold}>Peso:</span> {weight}</Typography>
          <Typography variant='h6' className={`${styles.centertext} ${styles.bold}`}>{types.length > 1 ? 'Tipos:' : 'Tipo:'}</Typography>
          
          {types.map( tipoInfo => {
            const {type} = tipoInfo;
            const {name} = type;

            return (
              <Typography key={name} className={styles.centertext}>
                {name}
              </Typography>
            )
          })}

        </>
      )

    }

  return (
    <>
      {pokemon === undefined && <div className={styles.carga}><CircularProgress color="warning"/></div>}
      {pokemon !== undefined && pokemon  && generadorPokemon()}
      {pokemon === false && <Typography> Pokemon no encontrado</Typography>}
      {pokemon !== undefined && (
        <Link to={`/`}  className={styles.link}>
          <div className={styles.btn}> 
            <Button variant='contained'>Regresa a la pokedex</Button>
          </div>
        </Link>
      )}
    </>
  )
}

export default Pokemon
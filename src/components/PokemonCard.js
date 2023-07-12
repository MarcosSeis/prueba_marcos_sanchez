import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import styles from '../css/pokemonCard.module.css';
import { capsFirst } from '../helpers';

const PokemonCard = ({ pokemonId, pokemonData }) => {
  const { id, name } = pokemonData[pokemonId];
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Grid item xs={4} key={pokemonId}>
    <Link to={`/${pokemonId}`} className={styles.link}>
      <Card>
        <CardMedia
          className={styles.media_pokemon}
          image={sprite}
          style={{ width: '130px', height: '130px' }}
        />
        <CardContent>
          <Typography className={styles.text_pokemon}>
            {`${id}. ${capsFirst(name)}`}
          </Typography>
        </CardContent>
      </Card>
    </Link>
    </Grid>
  );
};

export default PokemonCard;

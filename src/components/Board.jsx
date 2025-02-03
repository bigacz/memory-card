import { fetchMoviesData, getDifficultyQuantity } from 'src/utilities';

import Card from 'components/Card';
import Scoreboard from 'components/Scoreboard';
import EndModal from 'components/EndModal';

import { useEffect, useState } from 'react';

/**
 *
 * @param {'easy'|'normal'|'hard'|'serious'} props.difficulty - Determines amount of cards on the board.
 * @param {string} props.genre - The genre of movies that should be displayed on cards.
 * @returns
 */

function Board({ difficulty, genre }) {
  const [movies, setMovies] = useState([]);
  const [areClicked, setAreClicked] = useState([]);

  useEffect(() => {
    let isIgnored = false;

    async function fetchMovies() {
      const response = await fetchMoviesData(genre);

      if (!isIgnored) {
        setMovies(response.results);
      }
    }

    fetchMovies();

    return () => {
      isIgnored = true;
    };
  }, [genre]);

  const quantity = getDifficultyQuantity(difficulty);

  if (movies.length <= quantity) {
    return <div></div>;
  }

  let cards = [];
  for (let i = 0; i < quantity; i++) {
    const movie = movies[i];
    const isClicked = areClicked[i] ?? false;
    const imagePath = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;

    function setIsClicked() {
      const newAreClicked = [...areClicked];
      newAreClicked[i] = !isClicked;

      setAreClicked(newAreClicked);
    }

    const card = (
      <Card
        key={movie.id}
        text={movie.title}
        image={imagePath}
        isClicked={isClicked}
        onClick={setIsClicked}
      />
    );

    cards.push(card);
  }

  return <div>{cards}</div>;
}

export default Board;

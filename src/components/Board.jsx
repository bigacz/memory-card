import { fetchMoviesData, getDifficultyQuantity } from 'src/utilities';

import Card from 'components/Card';
import Scoreboard from 'components/Scoreboard';
import EndModal from 'components/EndModal';

import { useEffect, useState } from 'react';

import { generateValueArray, countValuesInArray } from 'src/utilities';

/**
 *
 * @param {'easy'|'normal'|'hard'|'serious'} props.difficulty - Determines amount of cards on the board.
 * @param {string} props.genre - The genre of movies that should be displayed on cards.
 * @returns
 */

function Board({ difficulty, genre }) {
  const quantity = getDifficultyQuantity(difficulty);

  const [movies, setMovies] = useState([]);
  const [clicks, setClicks] = useState(generateValueArray(quantity, 0));

  function restartGame() {
    setClicks(generateValueArray(quantity, 0));
  }

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

  if (movies.length < quantity) {
    return <div></div>;
  }

  let cards = [];
  for (let i = 0; i < quantity; i++) {
    const movie = movies[i];
    const imagePath = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;

    function handleCardClick() {
      const newClicks = [...clicks];
      newClicks[i] += 1;

      if (!isEnd) {
        setClicks(newClicks);
      }
    }

    const card = (
      <Card
        key={movie.id}
        text={movie.title}
        image={imagePath}
        onClick={handleCardClick}
      />
    );

    cards.push(card);
  }

  const isLoss = clicks.some((click) => click > 1);
  const isWin = clicks.every((click) => click === 1);
  const isEnd = isLoss || isWin;

  const score = countValuesInArray(clicks, 1);

  return (
    <>
      <div>{cards}</div>
      {isEnd && (
        <EndModal
          isWin={isWin}
          score={score}
          difficulty={difficulty}
          genre={genre}
          // onNavigateToMenuClick={}
          onRestartGameClick={restartGame}
        />
      )}
    </>
  );
}

export default Board;

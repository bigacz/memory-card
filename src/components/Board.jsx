import {
  fetchMoviesData,
  getDifficultyQuantity,
  getUniqueNumberArray,
  removeNumbers,
  changeArrayOrder,
  countValuesGreaterOrEqual,
} from 'src/utilities';

import Card from 'components/Card';
import Scoreboard from 'components/Scoreboard';
import EndModal from 'components/EndModal';

import { useEffect, useState } from 'react';

import { generateValueArray } from 'src/utilities';

/**
 *
 * @param {'easy'|'normal'|'hard'|'serious'} props.difficulty - Determines amount of cards on the board.
 * @param {string} props.genre - The genre of movies that should be displayed on cards.
 * @param {string} props.onNavigateToMenu - Function that will be called on click of a main menu button.
 * @returns
 */

function Board({ difficulty, genre, onNavigateToMenu }) {
  const quantity = getDifficultyQuantity(difficulty);

  const [movies, setMovies] = useState([]);
  const [clicks, setClicks] = useState(generateValueArray(20, 0));
  const [order, setOrder] = useState(getUniqueNumberArray(20));

  function restartGame() {
    setClicks(generateValueArray(20, 0));
    setRandomOrder();
  }

  function setRandomOrder() {
    const newOrder = getUniqueNumberArray(20);

    setOrder(newOrder);
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

      setClicks(newClicks);
      setRandomOrder();
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

  const reducedOrder = removeNumbers(order, quantity - 1);
  const randomizedCards = changeArrayOrder(cards, reducedOrder);

  const score = countValuesGreaterOrEqual(clicks, 1);

  const { isEnd, isWin } = getGameStatus(clicks, quantity);

  return (
    <>
      <Scoreboard score={score} genre={genre} difficulty={difficulty} />
      <button onClick={restartGame}>Restart</button>
      <button onClick={onNavigateToMenu}>Exit</button>
      <div>{randomizedCards}</div>

      {isEnd && (
        <EndModal
          isWin={isWin}
          score={score}
          difficulty={difficulty}
          genre={genre}
          onNavigateToMenuClick={onNavigateToMenu}
          onRestartGameClick={restartGame}
        />
      )}
    </>
  );
}

export default Board;

function getGameStatus(clicks, quantity) {
  const slicedClicks = clicks.slice(0, quantity);

  const isDefeat = slicedClicks.some((click) => click > 1);
  const isWin = slicedClicks.every((click) => click === 1);

  const isEnd = isDefeat || isWin;

  return { isEnd, isWin };
}

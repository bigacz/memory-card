import 'styles/components/Board.css';

import exitIcon from 'assets/icons/exit.svg';
import restartIcon from 'assets/icons/restart.svg';

import {
  fetchMoviesData,
  getDifficultyQuantity,
  getUniqueNumberArray,
  removeNumbers,
  changeArrayOrder,
  countValuesGreaterOrEqual,
} from 'src/utilities';

import Card from 'components/Card';
import EndModal from 'components/EndModal';

import { useEffect, useState } from 'react';

/**
 *
 * @param {'easy'|'normal'|'hard'|'serious'} props.difficulty - Determines amount of cards on the board.
 * @param {string} props.genre - The genre of movies that should be displayed on cards.
 * @param {string} props.bestScore - Best score that will be displayed in end screen,
 * @param {function} props.onNavigateToMenuClick - Function that will be called on click of a main menu button.
 * @returns
 */

function Board({
  clicks,
  difficulty,
  genre,
  bestScore,
  onNavigateToMenuClick,
  onRestartGame,
  onCardClick,
  wrapperClass,
}) {
  const quantity = getDifficultyQuantity(difficulty);

  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState(getUniqueNumberArray(20));

  function restartGame() {
    onRestartGame();
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
      onCardClick(i);

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
    <div className={`board ${wrapperClass}`}>
      <div className="board__buttons-wrapper">
        <button onClick={restartGame}>
          <img src={restartIcon} alt="Restart" />
        </button>
        <button onClick={onNavigateToMenuClick}>
          <img src={exitIcon} alt="Exit" />
        </button>
      </div>
      <div
        className={`board__cards-wrapper board__cards-wrapper--${difficulty}`}
      >
        {randomizedCards}
      </div>

      {isEnd && (
        <EndModal
          isWin={isWin}
          score={score}
          bestScore={bestScore}
          difficulty={difficulty}
          genre={genre}
          onNavigateToMenuClick={onNavigateToMenuClick}
          onRestartGameClick={restartGame}
        />
      )}
    </div>
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

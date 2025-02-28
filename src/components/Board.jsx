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
 * @param {number} props.clicks - isClicked array of cards.
 * @param {'easy'|'normal'|'hard'|'serious'} props.difficulty - Determines amount of cards on the board.
 * @param {string} props.genre - The genre of movies that should be displayed on cards.
 * @param {number} props.bestScore - Best score that will be displayed in end screen.
 * @param {function} props.onNavigateToMenuClick - Function that will be called on click of a main menu button.
 * @param {function} props.onCardClick - Function that will be called on click of a card, will be provided an index of clicked card.
 * @param {string} props.wrapperClass - Class that will be applied to the outermost component element.
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
    const imagePath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

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
        <button
          onClick={restartGame}
          className="board__buttons-wrapper__button board__buttons-wrapper__button--restart"
        >
          <img src={restartIcon} alt="Restart" draggable="false" />
        </button>
        <button
          onClick={onNavigateToMenuClick}
          className="board__buttons-wrapper__button board__buttons-wrapper__button--exit"
        >
          <img src={exitIcon} alt="Exit" draggable="false" />
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

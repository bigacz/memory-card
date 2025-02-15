import 'styles/components/GameSelector.css';

import difficulties from 'data/difficulties.json';
import genres from 'data/genres';
import { capitalize } from 'src/utilities';

/**
 *
 * @param {string} props.selectedDifficulty - Highlights received difficulty.
 * @param {string} props.selectedGenre - Highlights received genre.
 * @param {function} props.onDifficultySelect - Function that will be called on a click of any difficulty.
 * @param {function} props.onGenreSelect - Function that will be called on a click of any genre.
 * @returns
 */

function GameSelector({
  selectedDifficulty,
  selectedGenre,
  bestScoreTable,
  onDifficultySelect,
  onGenreSelect,
}) {
  const genresButtons = genres.map((genre) => {
    const { name, id, image } = genre;

    function sendGenreSelect() {
      onGenreSelect(name);
    }

    return (
      <button
        onClick={sendGenreSelect}
        key={id}
        className="game-selector__genres__button"
      >
        <img src={image} alt="" />
        <p>{name}</p>
      </button>
    );
  });

  const difficultiesButtons = difficulties.map((difficulty) => {
    const { name, quantity } = difficulty;
    const bestScore = bestScoreTable[`${selectedGenre}${name}`] ?? 0;

    function sendDifficultySelect() {
      onDifficultySelect(name);
    }

    const classNames = [
      'game-selector__difficulties__button',
      `game-selector__difficulties__button--${name}`,
    ].join(' ');

    return (
      <button
        onClick={sendDifficultySelect}
        key={quantity}
        className={classNames}
      >
        <p className="game-selector__difficulties__button__name">
          {capitalize(name)}
        </p>
        <p className="game-selector__difficulties__button__score">
          Score: {bestScore}
        </p>
      </button>
    );
  });

  return (
    <div className="game-selector">
      <div className="game-selector__genres">{genresButtons}</div>
      <div className="game-selector__difficulties">{difficultiesButtons}</div>
    </div>
  );
}

export default GameSelector;

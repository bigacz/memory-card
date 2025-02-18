import 'styles/components/GameSelector.css';

import difficulties from 'data/difficulties.json';
import genres from 'data/genres';
import { capitalize } from 'src/utilities';

/**
 *
 * @param {string} props.selectedGenre - Highlights received genre.
 * @param {function} props.onDifficultySelect - Function that will be called on a click of any difficulty.
 * @param {function} props.onGenreSelect - Function that will be called on a click of any genre.
 * @returns
 */

function GameSelector({
  selectedGenre,
  bestScoreTable,
  onDifficultySelect,
  onGenreSelect,
  wrapperClass,
}) {
  const genresButtons = genres.map((genre) => {
    const { name, id, image } = genre;

    function sendGenreSelect() {
      onGenreSelect(name);
    }

    const buttonClasses = [
      'game-selector__genres__button',
      selectedGenre === name && 'game-selector__genres__button--selected',
    ].join(' ');

    return (
      <button onClick={sendGenreSelect} key={id} className={buttonClasses}>
        <img src={image} alt={name} draggable="false" />
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
    <div className={`game-selector ${wrapperClass}`}>
      <div className="game-selector__genres">{genresButtons}</div>
      <div className="game-selector__difficulties">{difficultiesButtons}</div>
    </div>
  );
}

export default GameSelector;

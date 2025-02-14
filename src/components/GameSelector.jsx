import 'styles/components/GameSelector.css';

import difficulties from 'data/difficulties.json';
import genres from 'data/genres';

/**
 *
 * @param {string} props.selectedDifficulty - Highlights received difficulty.
 * @param {string} props.selectedGenre - Highlights received genre.
 * @param {function} props.onDifficultySelect - Function that will be called on a click of any difficulty.
 * @param {function} props.onGenreSelect - Function that will be called on a click of any genre.
 * @param {function} props.onPlayClick - Function that will be called on a click of a play button.
 * @returns
 */

function GameSelector({
  selectedDifficulty,
  selectedGenre,
  bestScoreTable,
  onDifficultySelect,
  onGenreSelect,
  onPlayClick,
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
        className="game-selector__genres-wrapper__button"
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

    return (
      <button onClick={sendDifficultySelect} key={quantity}>
        <p>{name}</p>
        <p>High Score: {bestScore}</p>
      </button>
    );
  });

  return (
    <div className="game-selector">
      <div className="game-selector__genres-wrapper">{genresButtons}</div>
      <div className="game-selector__difficulties-wrapper">
        {difficultiesButtons}
      </div>
      <div>
        <button onClick={onPlayClick}>Play</button>
      </div>
    </div>
  );
}

export default GameSelector;

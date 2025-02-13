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
      <button onClick={sendGenreSelect} key={id} className="game-selector-card">
        <img src={image} alt="" />
        {name}
      </button>
    );
  });

  const difficultiesButtons = difficulties.map((difficulty) => {
    const { name, quantity } = difficulty;

    function sendDifficultySelect() {
      onDifficultySelect(name);
    }

    return (
      <button onClick={sendDifficultySelect} key={quantity}>
        {name}
      </button>
    );
  });

  return (
    <div>
      <div>{genresButtons}</div>
      <div>{difficultiesButtons}</div>
      <div>
        <button onClick={onPlayClick}>Play</button>
      </div>
    </div>
  );
}

export default GameSelector;

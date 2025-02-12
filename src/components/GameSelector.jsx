import difficulties from 'data/difficulties.json';
import genres from 'data/genres';

function GameSelector({
  selectedDifficulty,
  selectedGenre,
  onDifficultySelect,
  onGenreSelect,
  onPlayClick,
}) {
  const genresButtons = genres.map((genre) => {
    const { name, id } = genre;

    function sendGenreSelect() {
      onGenreSelect(name);
    }

    return (
      <button onClick={sendGenreSelect} key={id}>
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

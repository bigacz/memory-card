import difficulties from 'data/difficulties.json';

function GameSelector({
  selectedDifficulty,
  selectedGenre,
  onDifficultySelect,
  onGenreSelect,
  onPlayClick,
}) {
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
      <div>{difficultiesButtons}</div>
      <div>
        <button onClick={onPlayClick}>Play</button>
      </div>
    </div>
  );
}

export default GameSelector;

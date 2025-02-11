import difficulties from 'data/difficulties.json';

function GameSelector({
  selectedDifficulty,
  selectedGenre,
  onDifficultySelect,
  onGenreSelect,
  onExit,
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
    </div>
  );
}

export default GameSelector;

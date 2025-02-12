import GameSelector from 'components/GameSelector';
import Board from 'components/Board';

import { useState } from 'react';

function Game() {
  const [difficulty, setDifficulty] = useState('easy');
  const [genre, setGenre] = useState('western');
  const [isBoardDisplayed, setIsBoardDisplayed] = useState(false);

  function hideBoard() {
    setIsBoardDisplayed(false);
  }

  function showBoard() {
    setIsBoardDisplayed(true);
  }

  const board = (
    <Board difficulty={difficulty} genre={genre} onNavigateToMenu={hideBoard} />
  );

  const gameSelector = (
    <GameSelector
      selectedDifficulty={difficulty}
      selectedGenre={genre}
      onDifficultySelect={setDifficulty}
      onGenreSelect={setGenre}
      onPlayClick={showBoard}
    />
  );

  return <>{isBoardDisplayed ? board : gameSelector}</>;
}

export default Game;

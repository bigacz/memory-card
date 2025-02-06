import GameSelector from 'components/GameSelector';
import Board from 'components/Board';

import { useState } from 'react';

function Game() {
  const [difficulty, setDifficulty] = useState('easy');
  const [genre, setGenre] = useState('western');
  const [isBoardDisplayed, setIsBoardDisplayed] = useState(true);

  function hideBoard() {
    setIsBoardDisplayed(false);
  }

  return (
    <>
      {isBoardDisplayed && (
        <Board
          difficulty={difficulty}
          genre={genre}
          onNavigateToMenu={hideBoard}
        />
      )}
    </>
  );
}

export default Game;

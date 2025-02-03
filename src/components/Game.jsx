import GameSelector from 'components/GameSelector';
import Board from 'components/Board';

import { useState } from 'react';

function Game() {
  const [difficulty, setDifficulty] = useState('easy');
  const [genre, setGenre] = useState('western');

  return <Board difficulty={difficulty} genre={genre} />;
}

export default Game;

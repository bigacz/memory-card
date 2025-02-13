import GameSelector from 'components/GameSelector';
import Board from 'components/Board';

import { useState } from 'react';
import { getBestScoresTable, saveBestScoresTable } from 'src/utilities';

function Game() {
  const [bestScoreTable, setBestScoreTable] = useState(getBestScoresTable());
  const [difficulty, setDifficulty] = useState('easy');
  const [genre, setGenre] = useState('western');
  const [isBoardDisplayed, setIsBoardDisplayed] = useState(false);

  function hideBoard() {
    setIsBoardDisplayed(false);
  }

  function showBoard() {
    setIsBoardDisplayed(true);
  }

  function onBestScoreChange(score) {
    const newBestScoreTable = { ...bestScoreTable };
    newBestScoreTable[`${genre}${difficulty}`] = score;

    setBestScoreTable(newBestScoreTable);
    saveBestScoresTable(newBestScoreTable);
  }

  const bestScore = bestScoreTable[`${genre}${difficulty}`] ?? 0;

  const board = (
    <Board
      difficulty={difficulty}
      genre={genre}
      bestScore={bestScore}
      onNavigateToMenuClick={hideBoard}
      onBestScoreChange={onBestScoreChange}
    />
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

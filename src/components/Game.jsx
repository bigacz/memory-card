import 'styles/components/Game.css';

import GameSelector from 'components/GameSelector';
import Board from 'components/Board';

import { useState } from 'react';
import {
  getBestScoresTable,
  generateValueArray,
  saveBestScoresTable,
  countValuesGreaterOrEqual,
} from 'src/utilities';
import Scoreboard from 'components/Scoreboard';

function Game() {
  const [clicks, setClicks] = useState(generateValueArray(20, 0));
  const [bestScoreTable, setBestScoreTable] = useState(getBestScoresTable());
  const [difficulty, setDifficulty] = useState('easy');
  const [genre, setGenre] = useState('western');
  const [isBoardDisplayed, setIsBoardDisplayed] = useState(false);

  function hideBoard() {
    setIsBoardDisplayed(false);
  }

  function changeDifficultyAndStart(difficulty) {
    setDifficulty(difficulty);
    resetClicks();

    setIsBoardDisplayed(true);
  }

  function changeGenre(genre) {
    setGenre(genre);
    resetClicks();
  }

  function resetClicks() {
    setClicks(generateValueArray(20, 0));
  }

  function updateClicks(clickIndex) {
    const newClicks = [...clicks];
    newClicks[clickIndex] += 1;

    setClicks(newClicks);
  }

  const score = countValuesGreaterOrEqual(clicks, 1);
  const bestScore = bestScoreTable[`${genre}${difficulty}`] ?? 0;

  if (score > bestScore) {
    const newBestScoreTable = { ...bestScoreTable };
    newBestScoreTable[`${genre}${difficulty}`] = score;

    setBestScoreTable(newBestScoreTable);
    saveBestScoresTable(newBestScoreTable);
  }

  const board = (
    <Board
      clicks={clicks}
      difficulty={difficulty}
      genre={genre}
      bestScore={bestScore}
      onNavigateToMenuClick={hideBoard}
      onRestartGame={resetClicks}
      onCardClick={updateClicks}
      wrapperClass="game__board"
    />
  );

  const gameSelector = (
    <GameSelector
      selectedGenre={genre}
      bestScoreTable={bestScoreTable}
      onDifficultySelect={changeDifficultyAndStart}
      onGenreSelect={changeGenre}
      wrapperClass="game__game-selector"
    />
  );

  return (
    <div className="game">
      <h1 className="game__header">Movie Memory</h1>
      {isBoardDisplayed && (
        <Scoreboard
          score={score}
          bestScore={bestScore}
          wrapperClass="game__scoreboard"
        />
      )}
      {isBoardDisplayed ? board : gameSelector}
    </div>
  );
}

export default Game;

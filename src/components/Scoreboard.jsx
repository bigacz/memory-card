function Scoreboard({ score, genre, difficulty }) {
  const savedBestScore = getBestScore(genre, difficulty);

  let bestScore = savedBestScore;
  if (score > savedBestScore) {
    saveBestScore(score, genre, difficulty);
    bestScore = score;
  }

  return (
    <div>
      <span>Current score: {score}</span>
      <span>High score: {bestScore}</span>
    </div>
  );
}

export default Scoreboard;

function getBestScore(genre, difficulty) {
  const bestScoresTable = getBestScoresTable();

  const bestScore = bestScoresTable[`${genre}${difficulty}`];

  if (bestScore == null) {
    return 0;
  } else {
    return bestScore;
  }
}

function saveBestScore(score, genre, difficulty) {
  const bestScoresTable = getBestScoresTable();
  bestScoresTable[`${genre}${difficulty}`] = score;

  localStorage.setItem('bestScores', JSON.stringify(bestScoresTable));
}

function getBestScoresTable() {
  let bestScoresTable = JSON.parse(localStorage.getItem('bestScores'));
  if (bestScoresTable == null) {
    bestScoresTable = {};
  }

  return bestScoresTable;
}

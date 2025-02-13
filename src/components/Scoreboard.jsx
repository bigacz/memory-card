function Scoreboard({ bestScore, score }) {
  return (
    <div>
      <span>Current score: {score}</span>
      <span>High score: {bestScore}</span>
    </div>
  );
}

export default Scoreboard;

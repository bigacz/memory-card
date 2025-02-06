/**
 *
 * @param {boolean} props.isWin - Displays whether game was won or not.
 * @param {number} props.score - Displays score.
 * @param {string} props.difficulty - Displays difficulty.
 * @param {string} props.genre - Displays genre.
 * @param {function} props.onNavigateToMenuClick - Function that will be called on click of a main menu button.
 * @param {function} props.onGameRestartClick - Function that will be called on click of a restart button.
 * @returns
 */

function EndModal({
  isWin,
  score,
  difficulty,
  genre,
  onNavigateToMenuClick,
  onRestartGameClick,
}) {
  return (
    <div>
      <div>
        <h2>You {isWin ? 'won' : 'lost'}!</h2>
        <p>Score: {score}</p>
        <p>Difficulty: {difficulty}</p>
        <p>Genre: {genre}</p>
      </div>
      <button onClick={onNavigateToMenuClick}>Main Menu</button>
      <button onClick={onRestartGameClick}>Play again</button>
    </div>
  );
}

export default EndModal;

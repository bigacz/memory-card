import { useEffect } from 'react';
import 'styles/components/EndModal.css';

/**
 *
 * @param {boolean} props.isWin - Displays whether game was won or not.
 * @param {number} props.score - Displays score.
 * @param {string} props.bestScore - Displays best score.
 * @param {string} props.difficulty - Displays difficulty.
 * @param {string} props.genre - Displays genre.
 * @param {function} props.onNavigateToMenuClick - Function that will be called on click of a main menu button.
 * @param {function} props.onGameRestartClick - Function that will be called on click of a restart button.
 * @returns
 */

const body = document.getElementsByTagName('body')[0];

function EndModal({
  isWin,
  score,
  bestScore,
  difficulty,
  genre,
  onNavigateToMenuClick,
  onRestartGameClick,
}) {
  useEffect(() => {
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = '';
    };
  });

  return (
    <div className="end-modal">
      <div className="end-modal__dialog">
        <div>
          <h2>You {isWin ? 'won' : 'lost'}!</h2>
          <p>Score: {score}</p>
          <p>High Score: {bestScore}</p>
          <p>Difficulty: {difficulty}</p>
          <p>Genre: {genre}</p>
        </div>
        <button onClick={onNavigateToMenuClick}>Main Menu</button>
        <button onClick={onRestartGameClick}>Play again</button>
      </div>
    </div>
  );
}

export default EndModal;

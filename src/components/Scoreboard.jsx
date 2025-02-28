import 'styles/components/Scoreboard.css';

/**
 *
 * @param {number} props.bestScore - Best score, will be displayed.
 * @param {number} props.score -  Score, will be displayed.
 * @param {string} props.wrapperClass - Class that will be applied to the outermost component element.
 * @returns
 */

function Scoreboard({ bestScore, score, wrapperClass }) {
  return (
    <div className={`scoreboard ${wrapperClass}`}>
      <p>
        High score: <b>{bestScore}</b>
      </p>
      <p>
        Current score: <b>{score}</b>
      </p>
    </div>
  );
}

export default Scoreboard;

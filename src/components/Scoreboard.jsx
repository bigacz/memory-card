/**
 *
 * @param {string} props.wrapperClass - Class that will be applied to the outermost component element
 * @returns
 */

function Scoreboard({ bestScore, score, wrapperClass }) {
  return (
    <div className={wrapperClass}>
      <p>Current score: {score}</p>
      <p>High score: {bestScore}</p>
    </div>
  );
}

export default Scoreboard;

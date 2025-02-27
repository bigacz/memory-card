import { useState } from 'react';
import 'styles/components/Card.css';

/**
 *
 * @param {string} props.text - Text that will be displayed on the card.
 * @param {string} props.image - Path of image that will be displayed on the card.
 * @param {function} props.onClick - Function that will be called on click of the card.
 */

function Card({ text, image, onClick }) {
  const [cursorPercentage, setCursorPosition] = useState(null);

  let xPosition;
  let yPosition;
  if (cursorPercentage != null) {
    xPosition = cursorPercentage.x;
    yPosition = cursorPercentage.y;
  }

  return (
    <div
      onMouseMove={(event) => {
        const { x, y, width, height } = event.target.getBoundingClientRect();
        const { clientX, clientY } = event;

        const xPosition = Math.round(clientX - x);
        const yPosition = Math.round(clientY - y);

        const xMiddleRelative = xPosition - width / 2;
        const yMiddleRelative = yPosition - height / 2;

        const xPercentage = xMiddleRelative / (width / 2);
        const yPercentage = (yMiddleRelative / (height / 2)) * -1;

        const newCursorPercentage = { x: xPercentage, y: yPercentage };

        setCursorPosition(newCursorPercentage);
      }}
      onMouseLeave={() => {
        setCursorPosition({ x: 0, y: 0 });
      }}
    >
      <img
        onClick={onClick}
        style={{
          transform: `perspective(1000px) rotate3d(${yPosition}, ${xPosition}, 0, 0.07turn)`,
        }}
        src={image}
        alt={text}
        draggable="false"
        className="card"
      />
    </div>
  );
}

export default Card;

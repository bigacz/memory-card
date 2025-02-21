/**
 *
 * @param {string} props.text - Text that will be displayed on the card.
 * @param {string} props.image - Path of image that will be displayed on the card.
 * @param {function} props.onClick - Function that will be called on click of the card.
 */

function Card({ text, image, onClick }) {
  return <img onClick={onClick} src={image} alt={text} draggable="false" />;
}

export default Card;

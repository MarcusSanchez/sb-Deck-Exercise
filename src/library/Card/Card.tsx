type CardProps = {
  suit: string;
  value: string;
};

function Card({ suit, value }: CardProps) {
  return (
    <div>
      <span>{value} of {suit}</span>
      <br />
    </div>
  );
}

export default Card;
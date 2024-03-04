import { useEffect, useState } from "react";
import Card from "../Card/Card.tsx";

const API = "https://deckofcardsapi.com/api";

type Deck = {
  deck_id: string;
}

type Card = {
  suit: string;
  value: string;
}

type Cards = {
  remaining: number;
  cards: Card[];
}

function Deck() {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API}/deck/new/shuffle`);
      const data: Deck = await response.json();
      setDeck(data);
    })();
  }, []);

  const draw = async () => {
    const endpoint = `${API}/deck/${deck!.deck_id}/draw`;

    const response = await fetch(endpoint);
    const data: Cards = await response.json();
    if (data.remaining === 0) {
      alert("No cards remaining!");
      return;
    }

    const { suit, value } = data.cards[0];
    setCards([...cards, { suit, value }]);
  };

  const shuffle = async () => {
    const endpoint = `${API}/deck/${deck!.deck_id}/shuffle`;
    const response = await fetch(endpoint);
    const data: Deck = await response.json();
    setDeck(data);
    setCards([]);
  };

  return (
    <div>
      <button onClick={draw}>Draw</button>
      <button onClick={shuffle}>Shuffle</button>
      <div>
        {cards.map((card, index) => (
          <Card
            key={index}
            suit={card.suit}
            value={card.value}
          />
        ))}
      </div>
    </div>
  );
}

export default Deck;
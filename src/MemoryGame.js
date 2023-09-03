// MemoryGame.js
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Alert, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MemoryGame.css";

const cardsData = [
  { id: 1, value: "🎃" },
  { id: 2, value: "🤖" },
  { id: 3, value: "❤️" },
  { id: 4, value: "🔥" },
  { id: 5, value: "🎃" },
  { id: 6, value: "🤖" },
  { id: 7, value: "❤️" },
  { id: 8, value: "🔥" },
];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [messageWin, setMessage] = useState("");

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.value === card2.value) {
        setMatchedCards([...matchedCards, card1.id, card2.id]);
        setFlippedCards([]);
        setScore(score + 1);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setErrors(errors + 1);
        }, 1000);
      }
    }
  }, [flippedCards, matchedCards, score, errors]);

  useEffect(() => {
    const shuffledCards = shuffleArray(cardsData);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (score === 4) {
      setMessage("You won ! Congratulations !");
    }
  }, [score]);

  useEffect(() => {
    if (score === 0) {
      setMessage("");
    }
  }, [score]);

  const flipCard = (card) => {
    if (flippedCards.length === 2 || matchedCards.includes(card.id)) {
      return false;
    }
    if (flippedCards.length === 1 && flippedCards[0].id === card.id) {
      return true;
    }
    setFlippedCards([...flippedCards, card]);
  };

  const resetGame = () => {
    const shuffledCards = shuffleArray(cardsData);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setErrors(0);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div className="container text-center">
      <h1 className="mb-4">Memory Game</h1>
      <Alert variant="success" className="mb-4">
        {messageWin}
      </Alert>
      <Row className="mb-3">
        {cards.map((card) => (
          <Col key={card.id} sm={3} className="mb-3">
            <Card
              className={`memory-card ${
                flippedCards.includes(card) || matchedCards.includes(card.id)
                  ? "flipped"
                  : ""
              }`}
              onClick={() => {
                flipCard(card);
                console.log(flippedCards);
              }}
            >
              <div className="card-inner">
                <div className="card-front">
                  <Card.Body>
                    <Card.Title>
                      {flippedCards.includes(card) ||
                      matchedCards.includes(card.id)
                        ? card.value
                        : "?"}
                    </Card.Title>
                  </Card.Body>
                </div>
                <div className="card-back"></div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Alert variant="success" className="mb-3">
        Score: {score}
      </Alert>
      <Alert variant="danger" className="mb-3">
        Errors: {errors}
      </Alert>
      <Button onClick={resetGame} variant="primary">
        Reset
      </Button>
    </div>
  );
}

export default MemoryGame;

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

// displays a form requesting front/back inputs for modifying an existing card
export default function EditCard() {
  const history = useHistory();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState({});

  const _deckId = Number(useParams().deckId);
  const _cardId = Number(useParams().cardId);

  // takes the id from the URL params upon first render; added dependency to get rid of console warnings
  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(_deckId);
      setDeck(response);
      // set the front and back to the current values
      const initialValues = response.cards.find((c) => c.id === _cardId);
      setFront(initialValues.front);
      setBack(initialValues.back);
    }
    getDeck();
  }, [_deckId, _cardId]);

  // checks for deck existence before following up w/ additional logic
  if (!deck.id) return null;
  const card = deck.cards.find((c) => c.id === _cardId);
  // checks for card existence before following up w/ additional logic
  if (!card.id) return null;

  function Nav() {
    return (
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light nav-flex">
            <a className="navbar-brand" href="/">
              <h5 className="text-primary">Home</h5>
            </a>
            <h5>/</h5>
            <a
              className="nav-link text-primary"
              href={`/decks/${_deckId}/cards/${_cardId}`}
            >
              <h5>{deck.name}</h5>
            </a>
            <h5>/</h5>
            <a
              className="nav-link text-secondary"
              href={`/decks/${_deckId}/cards/${_cardId}/edit`}
            >
              <h5>Edit Card {_cardId}</h5>
            </a>
          </nav>
        </div>
      </div>
    );
  }

  function TitleBar() {
    return (
      <div className="row">
        <div className="col-12">
          <h1>Edit Card</h1>
        </div>
      </div>
    );
  }

  function handleOnSubmit(evt) {
    evt.preventDefault();

    async function makeCardEdit() {
      card.front = front;
      card.back = back;
      const response = await updateCard(card);
      if (response) history.go(-1);
    }
    if (front && back) makeCardEdit();
  }

  return (
    <div className="container">
      <Nav />
      <TitleBar />
      <CardForm
        isEdit={true}
        setFront={setFront}
        setBack={setBack}
        handleOnSubmit={handleOnSubmit}
        front={card.front}
        back={card.back}
      />
    </div>
  );
}

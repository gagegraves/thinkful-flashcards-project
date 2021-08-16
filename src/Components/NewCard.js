import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

//displays the page for adding a new card to a deck
export default function NewCard() {
  const history = useHistory();
  const _deckId = Number(useParams().deckId);
  const [front, setFront] = useState("Front side of card");
  const [back, setBack] = useState("Backside of card");
  const [deck, setDeck] = useState({});

  // deckId is used for the dependency array because if the deckId changes, it'll change the cards that are displayed
  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(_deckId);
      setDeck(response);
    }
    getDeck();
  }, [_deckId]);

  // checks for deck before following up w/ additional logic
  if (!deck.id) return null;

  const cardObject = {
    front: "",
    back: "",
  }

  function Nav() {
    return (
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light nav-flex">
            <a className="navbar-brand" href="/">
              <h5 className="text-primary">Home</h5>
            </a>
            <h5>/</h5>
            <h5>{deck.name}</h5>
            <h5>/</h5>
            <a className="nav-link color-black" href={`/cards/new`}><h5>New</h5></a>
          </nav>
        </div>
      </div>
    )
  }

  function TitleBar() {
    return (
      <div className="row">
        <div className="col-12">
          <h1>Add Card</h1>
        </div>
      </div>
    )
  }

  function handleOnSubmit(evt) {
    evt.preventDefault();

    async function createNewCard(cardObject) {
      const response = await createCard(_deckId, cardObject);
      if (response) {
        history.push(`/decks/${_deckId}`);
        history.goForward();
        history.go(0);
      };
    }
    cardObject.front = front;
    cardObject.back = back;

    createNewCard(cardObject);
  }

  return (
    <div className="container">
      <Nav />
      <TitleBar />
      <CardForm isEdit={false} setFront={setFront} setBack={setBack} handleOnSubmit={handleOnSubmit} front={front} back={back} />
    </div>
  )
}
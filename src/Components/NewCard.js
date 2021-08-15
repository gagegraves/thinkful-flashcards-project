import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

// displays a form for creating a new card, which requires front and back inputs
export default function NewCard() {
  const history = useHistory();
  const _deckId = Number(useParams().deckId);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState({});

  // deckId is used for the dependency array because 
  // if the deckId changes at all, it'll change the cards that are displayed
  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(_deckId);
      setDeck(response);
    }
    getDeck();
  }, []);

  // checks for deck existence before following up w/ additional logic
  if (!deck.id) return null;

  // event handlers for front/back buttons
  const handleFrontInput = (evt) => setFront(evt.target.value);
  const handleBackInput = (evt) => setBack(evt.target.value);

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

    async function createNewCard(cardObj) {
      const response = await createCard(_deckId, cardObject);
      if (response) {
        history.push(`/decks/${_deckId}`);
        history.goForward();
        history.go(0);
      };
    }

    console.log("Submit button was clicked!: ", evt.target);

    cardObject.front = front;
    cardObject.back = back;

    createNewCard(cardObject);
  }

  return (
    <div className="container">
      <Nav />
      <TitleBar />
      <div className="row">
        <div className="col-12">
          <form className="newCardForm" onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="newCardFront">Front</label>
              <textarea className="form-control" id="newCardFront" placeholder="Front side of card" rows="2" onChange={handleFrontInput}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="newCardBack">Back</label>
              <textarea className="form-control" id="newCardBack" placeholder="Back side of card" rows="2" onChange={handleBackInput}></textarea>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-secondary btn-lg" onClick={() => history.go(-1)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
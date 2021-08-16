import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";

// displays the flash cards front first - can only switch to next card by flipping the card then hitting next
export default function Study() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const [isFlipped, setFlipped] = useState(false);
  const [focus, setFocus] = useState(1);

  const _deckId = Number(useParams().deckId);
  const [deck, setDeck] = useState({});

  // takes the id from the URL params upon first render; added dependency to get rid of console warnings
  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(_deckId);
      setDeck(response);
    }
    getDeck();
  }, [_deckId]);

  // checks for deck existence before following up w/ additional logic
  if (!deck) return null;
  const cards = deck.cards || null;

  // checks for card existence before following up w/ additional logic
  if (!cards) return null;

  const handleAddCards = (evt) => {
    evt.preventDefault();
    const addCardsUrl = url.replace('study', 'cards/new');
    history.push(addCardsUrl);
    history.goForward();
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
            <a className="nav-link text-primary" href={`/decks/${deck.id}`}><h5>{deck.name}</h5></a>
            <h5>/</h5>
            <a className="nav-link text-secondary" href={`/decks/${deck.id}/study`}><h5>Study</h5></a>
          </nav>
        </div>
      </div>
    )
  }

  function TitleBar() {
    return (
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">{deck.name}: Study</h1>
        </div>
      </div>
    )
  }

  function handleNext() {
    if (focus < cards.length) {
      setFocus(focus + 1);
      setFlipped(false);
    }
  }

  function handleCardFlip() {
    setFlipped(!isFlipped);
  }

  function Finish() {
    return (
      <div className="float-right">
        <button type="button" className="btn btn-danger btn-lg" onClick={() => history.go(-1)}>Finish</button>
      </div>
    )
  }

  function StudyCard() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card card-block">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <h2>Card {focus} of {cards.length}</h2>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <h4>{!isFlipped ? cards[focus - 1].front : cards[focus - 1].back}</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <button type="button" className="btn btn-secondary btn-lg" onClick={() => handleCardFlip()}>
                    Flip ({isFlipped ? "Front" : "Back"})
                  </button>
                  {(isFlipped && focus < cards.length) &&
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => { handleNext() }}>Next</button>
                  }

                  {focus === cards.length && <Finish />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function NotEnoughCards() {
    return (
      <div className="row text-center">
        <div className="col-12">
          <h2>Not Enough Cards</h2>
        </div>
        <div className="col-12">
          <h4>You need at least 3 cards to study</h4>
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={handleAddCards}>Add Cards</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Nav />
      <TitleBar />
      {cards.length >= 3 ?
        <StudyCard /> : <NotEnoughCards />
      }
    </div>
  )
}
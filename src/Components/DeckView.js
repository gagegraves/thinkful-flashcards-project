import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";

// displays the decks in Bootstrap card view from the home page
export default function DeckView({ removeCard }) {
    const { url } = useRouteMatch();
    const _id = Number(useParams().deckId);
    const [deck, setDeck] = useState({});

    // takes the id from the URL params upon first render
    // doesn't need anything in dependencies; will change as the url changes
    useEffect(() => {
        async function getDeck() {
            const response = await readDeck(_id);
            setDeck(response);
        }
        getDeck();
    }, []);

      // checks for deck existence before following up w/ additional logic
    if (!deck.id) return null;

    // removeCard is passed as a prop from index as it is called from multiple components
    const handleDeleteCard = (cardId) => removeCard(cardId, _id);

    function DeckBlock() {
        return (
            <div className="row deck-block">
                <div className="col-12">
                    <h3><span>{deck.name}</span></h3>
                    <h5>{deck.description}</h5>
                </div>
                <div className="col-12">
                    <Link to={`${url}/edit`}>
                        <button type="button" className="btn btn-secondary btn-lg">
                            Edit
                        </button>
                    </Link>
                    <Link to={`${url}/study`}>
                        <button type="button" className="btn btn-primary btn-lg">
                            Study
                        </button>
                    </Link>
                    <Link to={`${url}/cards/new`}>
                        <button type="button" className="btn btn-primary btn-lg">
                            Add Cards
                        </button>
                    </Link>
                    <div className="float-right">
                        <button type="button" className="btn btn-danger btn-lg">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
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
                        <a className="nav-link text-secondary" href={`/decks/${deck.id}`}><h5>{deck.name}</h5></a>
                    </nav>
                </div>
            </div>
        )
    }

    function cardBlock(card) {
        return (
            <div className="card card-block" key={`card_${card.id}`}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-1 border-right">
                            <p>{card.id}</p>
                        </div>
                        <div className="col-4">
                            <p>{card.front}</p>
                        </div>
                        <div className="col-4">
                            <p>{card.back}</p>
                        </div>
                        <div className="col-3">
                            <div className="float-right">
                                <Link to={`${url}/cards/${card.id}/edit`}>
                                    <button type="button" className="btn btn-secondary btn-lg">
                                        Edit
                                    </button>
                                </Link>
                                <button type="button" className="btn btn-danger btn-lg" onClick={() => handleDeleteCard(card.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function AllCards() {
        return (
            <div className="new row">
                <div className="col-12">
                    <h1>Cards</h1>
                    {deck.cards.map((card) => cardBlock(card))}
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <Nav />
            <DeckBlock />
            <AllCards />
        </div>
    )
}
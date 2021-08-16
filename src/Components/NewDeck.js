import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

// displays a page for creating a new deck
export default function NewDeck() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleDescriptionChange = (evt) => setDescription(evt.target.value);

  function Nav() {
    return (
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light nav-flex">
            <a className="navbar-brand" href="/">
              <h5 className="text-primary">Home</h5>
            </a>
            <h5>/</h5>
            <a className="nav-link color-black" href={`/decks/new`}><h5>New</h5></a>
          </nav>
        </div>
      </div>
    )
  }

  function TitleBar() {
    return (
      <div className="row">
        <div className="col-12">
          <h1>Create Deck</h1>
        </div>
      </div>
    )
  }

  function handleOnSubmit(evt) {
    evt.preventDefault();

    async function addNewDeck() {
      const newDeckObj = { name, description };
      const response = await createDeck(newDeckObj);

      if (response) {
        history.push(`/decks/${response.id}`);
        history.goForward();
        history.go(0);
      }
    }

    addNewDeck();
  }

  return (
    <div className="container">
      <Nav />
      <TitleBar />
      <div className="row">
        <div className="col-12">
          <form className="newDeckForm" onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="newDeckName">Name</label>
              <input type="text" className="form-control" id="newDeckName" placeholder="Deck Name" required onChange={handleNameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="newDeckDescription">Brief Description</label>
              <textarea className="form-control" id="newDeckDescription" placeholder="A concise description of the deck" rows="3" required onChange={handleDescriptionChange}></textarea>
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
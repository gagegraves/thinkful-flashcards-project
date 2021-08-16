import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateDeck } from "../utils/api";
import { readDeck } from "../utils/api";

// displays a page for modifying an existing card
export default function EditDeck(){
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deck, setDeck] = useState({});

  const _deckId = Number(useParams().deckId);

  useEffect(()=>{
    async function getDeck(){
        const response = await readDeck(_deckId);
        setDeck(response);
        setName(response.name);
        setDescription(response.description);
    }
    getDeck();
}, [_deckId]);


  const handleNameChange = (evt) => setName(evt.target.value);
  const handleDescriptionChange = (evt) => setDescription(evt.target.value);

    // checks for deck existence before following up w/ additional logic
  if (!deck.id) return null;

  function Nav(){
    return (
        <div className="row">
            <div className="col-12">
                <nav className="navbar navbar-expand-lg navbar-light bg-light nav-flex">
                    <a className="navbar-brand" href="/">
                        <h5 className="text-primary">Home</h5>
                    </a> 
                    <h5>/</h5>
                    <a className="nav-link text-primary" href={`/decks/${_deckId}`}><h5><span value={deck.name}>{deck.name}</span></h5></a>
                    <h5>/</h5>
                    <a className="nav-link text-secondary" href={`/decks/${_deckId}/edit`}><h5>Edit Deck</h5></a>
                    </nav>
            </div>
        </div>
    )
  }

  function TitleBar(){
    return (
      <div className="row">
        <div className="col-12">
        <h1>Edit Deck - <span>{deck.name}</span></h1>
        </div>
      </div>
    )
  }

  function handleOnSubmit(evt){
    evt.preventDefault();

    async function sendDeckUpdate(deck){
      const response = await updateDeck(deck);
      
      if (response){
        setName("");
        setDescription("");
        history.go(-1);
      }
    }

 
    if (name && description){
      deck.name = name;
      deck.description = description;
      sendDeckUpdate(deck);
    }

  }

  return (
    <div className="container">
      <Nav />
      <TitleBar />
      <div className="row">
        <div className="col-12">
          <form className="EditDeckForm" onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="editDeckName">Name</label>
              <input type="text" className="form-control" id="editDeckName" required placeholder={deck.name} defaultValue={deck.name} onChange={handleNameChange}  />
            </div>
            <div className="form-group">
              <label htmlFor="editDeckDescription">Brief Description</label>
              <textarea className="form-control" id="editDeckDescription" required placeholder={deck.description} defaultValue={deck.description} rows="3" onChange={handleDescriptionChange}></textarea>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-secondary btn-lg" onClick={()=>history.go(-1)}>
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
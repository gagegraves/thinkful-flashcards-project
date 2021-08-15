import React, {useState, useEffect} from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// api calls for data
import { listDecks, deleteDeck, deleteCard } from "../utils/api";

// component imports
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Components/Home";
import DeckView from "../Components/DeckView";
import Study from "../Components/Study";
import NewDeck from "../Components/NewDeck";
import EditDeck from "../Components/EditDeck";
import NewCard from "../Components/NewCard";
import EditCard from "../Components/EditCard";

function Layout() {
  const history = useHistory();
  const [decks, updateDecks] = useState([]);

  // loads all existent decks upon first render
  useEffect(()=>{
    async function getDecks(){
      const response = await listDecks();

      updateDecks([...response]);
    }
    getDecks();

  }, []);

  // event handler for removing a card
  // this functionality exists multiple places, so decided to make it a prop
  const removeCard = (cardId, deckId) => {
    async function remove(){
      const response = await deleteCard(cardId);
      if (!response) return;

      history.push(`/decks/${deckId}`);
      history.goForward();
      history.go(0);
      
    }
    
    (window.confirm("Are you sure you want to delete this card?")) && remove();
    
  }

    // event handler for removing a deck
  // this functionality exists multiple places, so decided to make it a prop
  const removeDeck = (deckId) => {
    async function remove(){
      const response = await deleteDeck(deckId);

      if (response){
        console.log("response: ", response);
        history.push(`/`);
        history.goForward();
        history.go(0);
      }
    }

    if (window.confirm("Are you sure you want to delete this deck?")){
      remove();
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          {/* Home */}
          <Route exact={true} path="/">
            <Home decks={decks} removeDeck={removeDeck} />
          </Route>

          <Route exact={true} path="/decks/new">
            <NewDeck />
          </Route>
          
          {/* Decks */}
          <Route exact={true} path="/decks/:deckId">
            <DeckView removeCard={removeCard} />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <NewCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          {/* Not Found */}
          <Route>
            <NotFound />
          </Route>

        </Switch>

      </div>
    </>
  );
}

export default Layout;
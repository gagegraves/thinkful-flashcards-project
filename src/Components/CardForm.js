import React from 'react';
import { useHistory } from "react-router-dom";

// form for creating/editing cards, child of EditCard.js and NewCard.js

export default function CardForm({isEdit, setFront, setBack, handleOnSubmit, front, back}) {
    const handleFrontInput = (evt) => setFront(evt.target.value);
    const handleBackInput = (evt) => setBack(evt.target.value);
    const history = useHistory();

    return (
        <div className="col-12">
          <form className="CardForm" onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="CardFront">Front</label>
              <textarea className="form-control" id="CardFront" placeholder={front} rows="2" defaultValue={isEdit ? front : ""} onChange={handleFrontInput}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="CardBack">Back</label>
              <textarea className="form-control" id="CardBack" placeholder={back} rows="2" defaultValue={isEdit ? back : ""} onChange={handleBackInput}></textarea>
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
    )
}

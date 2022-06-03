// SearchEvent.js

//Modules
import { useState } from "react";
import ModalWindow from "./ModalWindow";

const SearchEvents = ({
  fetchData,
  userInput,
  setUserInput,
  setEventsNotFound,
  newTitle,
  setNewTitle,
  setChosenCategory,
}) => {
  //create state to update title on form submit
  const [updateTitle, setUpdateTitle] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  //call api function on form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userInput) {
      // alert("Please enter a city");
      setIsModalOpen(true);
    } else {
      fetchData();
      //clear user input
      setUserInput("");
      //display user input in title after form submit
      setUpdateTitle(true);
      //store user input in new state to update title after form is cleared
      setNewTitle(userInput);
      //ensure error message is not displayed when data is found
      setEventsNotFound(false);
      setChosenCategory("All");
    }
  };

  //capture user input
  const onChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <section className="wrapper">
      <div className="formContainer">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="searchEvent">Search by city</label>
          <input
            id="searchEvent"
            type="text"
            onChange={onChange}
            value={userInput}
            placeholder="E.g. Toronto"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* on submit, display user input in title */}
      {!updateTitle ? null : <h1>Events in {newTitle}</h1>}

      {/* if there is no user input, display modal window */}
      {isModalOpen ? <ModalWindow setIsModalOpen={setIsModalOpen} /> : null}
    </section>
  );
};

export default SearchEvents;

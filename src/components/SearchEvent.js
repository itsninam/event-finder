// SearchEvent.js

//Modules
import { useState } from "react";

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

  //call api function on form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userInput) {
      alert("please type a city");
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
    <section>
      {/* on submit, display user input in title */}
      {!updateTitle ? (
        <h1>Events</h1>
      ) : (
        <h1>Events in {newTitle[0].toUpperCase() + newTitle.slice(1)}</h1>
      )}
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
    </section>
  );
};

export default SearchEvents;

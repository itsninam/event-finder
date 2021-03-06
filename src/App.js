//Styles
import "./styles/App.scss";

//Modules
import { useState } from "react";
import axios from "axios";

//Components
import DisplayEvents from "./components/DisplayEvents";
import Categories from "./components/Categories";
import SearchEvents from "./components/SearchEvent";

function App() {
  //store api data
  const [eventsData, setEventsData] = useState([]);

  //store user input from the form
  const [userInput, setUserInput] = useState("");

  //create state to display error message if api data not found
  const [eventsNotFound, setEventsNotFound] = useState(false);

  //create new state to capture user input after form submit
  const [newTitle, setNewTitle] = useState("");

  //capture chosen category
  const [chosenCategory, setChosenCategory] = useState("");

  //filtered
  const [filteredCategories, setFilteredCategories] = useState([]);

  //api call
  const fetchData = () => {
    axios({
      url: "https://app.ticketmaster.com/discovery/v2/events",
      params: {
        apikey: "nECUmdyhZAjqAnGtxK8PgEYLTQzbV9mU",
        city: userInput,
        countryCode: "ca",
      },
    })
      .then((response) => {
        setEventsData(response.data._embedded.events);
        setFilteredCategories(response.data._embedded.events);
      })
      .catch((error) => {
        //display error message if api data not found
        setEventsNotFound(true);
        //reset api results to empty array
        setEventsData([]);
        setFilteredCategories([]);
      });
  };

  return (
    <>
      <header>
        <SearchEvents
          fetchData={fetchData}
          userInput={userInput}
          setUserInput={setUserInput}
          setEventsNotFound={setEventsNotFound}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          setChosenCategory={setChosenCategory}
        />
      </header>
      <main>
        <Categories
          eventsData={eventsData}
          setChosenCategory={setChosenCategory}
          chosenCategory={chosenCategory}
          filteredCategories={filteredCategories}
          setFilteredCategories={setFilteredCategories}
        />
        <DisplayEvents
          eventsData={filteredCategories}
          eventsNotFound={eventsNotFound}
          newTitle={newTitle}
        />
      </main>
      <footer>
        <p className="footerText">Developed and designed by Madalina Oancea</p>
      </footer>
    </>
  );
}

export default App;

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

  //filter by category
  // const handleFilterCategory = (category) => {
  //   const filteredCategory = eventsData.filter(
  //     (event) => event.classifications[0].segment.name === category
  //   );
  //   setChosenCategory(filteredCategory);
  // };

  //api call
  const fetchData = () => {
    axios({
      url: "https://app.ticketmaster.com/discovery/v2/events",
      params: {
        apikey: "nECUmdyhZAjqAnGtxK8PgEYLTQzbV9mU",
        city: userInput,
        countryCode: "ca",
        //TODO: fix lat/long
      },
    })
      .then((response) => {
        setEventsData(response.data._embedded.events);
        console.log(response.data._embedded.events);
      })
      .catch((error) => {
        //display error message if api data not found
        setEventsNotFound(true);
        //reset api results to empty array
        setEventsData([]);
      });
  };

  return (
    <div className="App">
      <SearchEvents
        fetchData={fetchData}
        userInput={userInput}
        setUserInput={setUserInput}
        setEventsNotFound={setEventsNotFound}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
      />
      <Categories
        eventsData={eventsData}
        setChosenCategory={setChosenCategory}
        chosenCategory={chosenCategory}
      />
      <DisplayEvents
        eventsData={eventsData}
        eventsNotFound={eventsNotFound}
        newTitle={newTitle}
      />
    </div>
  );
}

export default App;

import "./styles/App.scss";

//Modules
import { useState } from "react";
import axios from "axios";

function App() {
  //store api data
  const [eventsData, setEventsData] = useState([]);

  //store user input from the form
  const [userInput, setUserInput] = useState("");

  //create state to update title on form submit
  const [updateTitle, setUpdateTitle] = useState(false);

  //create new state to capture user input after form submit
  const [newTitle, setNewTitle] = useState("");

  //create state to display error message if api data not found
  const [eventsNotFound, setEventsNotFound] = useState(false);

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
        console.log(response.data._embedded.events);
      })
      .catch((error) => {
        //display error message if api data not found
        setEventsNotFound(true);
        //reset api results to empty array
        setEventsData([]);
      });
  };

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
    }
  };

  const onChange = (event) => {
    setUserInput(event.target.value);
    //ensure error message is not displayed when data is found
  };

  return (
    <div className="App">
      {/* on submit, display user input in title */}
      {!updateTitle ? <h1>Events</h1> : <h1>Events in {newTitle}</h1>}
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
      {eventsNotFound ? (
        // inform user if events not found, otherwise display data on page
        <h2>Sorry, no events found in {newTitle} at this time</h2>
      ) : (
        <>
          {eventsData.map((event) => {
            return (
              <div key={event.id}>
                <h2>{event.name}</h2>
                <p>{event.dates.start.localDate}</p>
                <p>{event.dates.start.localTime}</p>
                <img src={event.images[0].url} alt={event.name}></img>
                {/* <p>{event["_embedded"].venues[0].address}</p> */}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;

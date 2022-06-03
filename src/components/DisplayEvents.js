// DisplayEvents.js

//Modules

//Styling
import ScrollToTop from "./ScrollToTopButton";

const DisplayEvents = ({ eventsData, eventsNotFound, newTitle }) => {
  //if is less than 12, set it to AM, otherwise set to PM
  const setTime = (time) => {
    return time.match(/^0/) || time.match(/^11/) ? "AM" : "PM";
  };

  //create state for heart icon
  // const [like, setLike] = useState([]);
  // let b = [];

  // //create function to add ids to likes
  // const handleLikeEvent = (id) => {
  //   for (let i = 0; i < like.length; i++) {
  //     console.log(like[i]);
  //     //check to see if it is in the array, if it is not add it
  //     if (b.indexOf(like[i]) === -1) {
  //       b.push(like[i]);
  //     } else {
  //       b.splice(like[i]);
  //     }
  //     setLike(b);
  //   }
  // };
  // console.log("likes:", like);

  return (
    <section className="displayEvents wrapper">
      {eventsNotFound ? (
        // inform user if events not found, otherwise display data on page
        <h2>
          {" "}
          Sorry, no events found in{" "}
          <span className="hightlight">
            {newTitle[0].toUpperCase() + newTitle.slice(1)}
          </span>{" "}
          at this time
        </h2>
      ) : (
        <>
          {eventsData.map((event) => {
            return (
              <ul key={event.id}>
                <li>
                  <h3 className="eventName">{event.name}</h3>
                  {/* <FontAwesomeIcon
                    icon={faHeart}
                    className="heartIcon"
                    onClick={() => handleLikeEvent(event.id)}
                  /> */}
                  <div className="flexContainer">
                    <div className="titleImgContainer">
                      <img src={event.images[0].url} alt={event.name}></img>
                    </div>
                    <div className="infoContainer">
                      <div>
                        <p>
                          <span className="boldText">Date: </span>{" "}
                          {event.dates.start.localDate}
                        </p>
                        {/* exclude api results without time property and remove trailing zeroes from time*/}
                        {event.dates.start.localTime === undefined ? null : (
                          <p>
                            <span className="boldText">Time: </span>{" "}
                            {event.dates.start.localTime.replace(/:00$/, "")}
                            {/* display AM or PM */}
                            <span> {setTime(event.dates.start.localTime)}</span>
                          </p>
                        )}
                        <p>
                          <span className="boldText">Status: </span>
                          {event.dates.status.code}
                        </p>
                      </div>
                      <div className="venueTicketsContainer">
                        <div className="venueInfo">
                          <p>{event._embedded.venues[0].name}</p>
                          <p className="address">
                            {event._embedded.venues[0].address.line1},{" "}
                            {event._embedded.venues[0].city.name}
                          </p>
                        </div>
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn"
                        >
                          Buy Tickets
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            );
          })}
        </>
      )}
      {/* display landing-page message if no events available on page, once events are displayed also display scroll to top component */}
      {Object.keys(eventsData).length === 0 ? (
        <h3 className="landingPageMessage">
          Seach for events in your favourite city to discover concerts, games,
          theater and more
        </h3>
      ) : (
        <ScrollToTop />
      )}
    </section>
  );
};

export default DisplayEvents;

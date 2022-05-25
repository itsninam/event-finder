// DisplayEvents.js

const DisplayEvents = ({ eventsData, eventsNotFound, newTitle }) => {
  //if time starts with a 0, set it to AM, otherwise set to PM
  const setTime = (time) => {
    return time.match(/^0/) ? "AM" : "PM";
  };

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
                  <h3>{event.name}</h3>
                  <div className="flexContainer">
                    <div className="titleImgContainer">
                      <img src={event.images[0].url} alt={event.name}></img>
                      {/* {!event.classifications ? null : (
                  <p>{event.classifications[0].segment.name}</p>
                )} */}
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
    </section>
  );
};

export default DisplayEvents;

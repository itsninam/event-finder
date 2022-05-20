// DisplayEvents.js

const DisplayEvents = ({ eventsData, eventsNotFound, newTitle }) => {
  //if time starts with a 0, set it to AM, otherwise set to PM
  const setTime = (time) => {
    return time.match(/^0/) ? "AM" : "PM";
  };

  return (
    <section>
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
                {/* exclude api results without time property and remove trailing zeroes from time*/}
                {event.dates.start.localTime === undefined ? null : (
                  <p>
                    {event.dates.start.localTime.replace(/:00$/, "")}
                    {/* display AM or PM */}
                    <span>{setTime(event.dates.start.localTime)}</span>
                  </p>
                )}
                <p> {event.dates.status.code}</p>
                <img src={event.images[0].url} alt={event.name}></img>
                <p>{event.classifications[0].segment.name}</p>
              </div>
            );
          })}
        </>
      )}
    </section>
  );
};

export default DisplayEvents;

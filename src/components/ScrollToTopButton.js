import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollToTop = () => {
  //scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className="scrollToTop" onClick={scrollToTop}>
      <FontAwesomeIcon icon={faArrowUpLong} />
    </button>
  );
};

export default ScrollToTop;

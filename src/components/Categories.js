//Categories.js

//Modules
import { useEffect, useState } from "react";

const Categories = ({
  eventsData,
  setChosenCategory,
  chosenCategory,
  setFilteredCategories,
}) => {
  //create state to store categories from api
  const [categories, setCategories] = useState([]);

  //capture user's chosen category
  const onCategoryChange = (event) => {
    setChosenCategory(event.target.value);
  };

  // create single categories from api result and add "All" as an option
  useEffect(
    () =>
      setCategories([
        "All",
        ...new Set(
          eventsData.map((event) =>
            //eliminate results that do not contain 'classifications' property
            !event.classifications
              ? null
              : event.classifications[0].segment.name
          )
        ),
      ]),
    [eventsData]
  );

  //  filter by category: if user selects all display all eventsData, otherwise display based on category
  const handleFilterData = (event, category) => {
    event.preventDefault();
    if (chosenCategory === "All") {
      setFilteredCategories(eventsData);
    } else {
      setFilteredCategories(
        eventsData.filter((event) =>
          //eliminate results that do not contain 'classifications' property
          !event.classifications
            ? null
            : event.classifications[0].segment.name === category
        )
      );
    }
  };

  return (
    <section className="categories wrapper">
      <form
        action=""
        onSubmit={(event) => handleFilterData(event, chosenCategory)}
      >
        {Object.keys(eventsData).length === 0 ? null : (
          <>
            <label htmlFor="categories">View by category</label>
            <select
              name="categories"
              id="categories"
              onChange={onCategoryChange}
              value={chosenCategory}
            >
              {categories.map((category, index) => {
                return <option key={index}>{category}</option>;
              })}
            </select>
            <button type="submit">Submit</button>
          </>
        )}
        {console.log(chosenCategory)}
      </form>
    </section>
  );
};

export default Categories;

//Categories.js

//Modules
import { useEffect, useState } from "react";

const Categories = ({
  eventsData,
  setChosenCategory,
  chosenCategory,
  filterCat,
  setFilterCat,
}) => {
  //create state to store categories from api
  const [categories, setCategories] = useState([]);

  //capture user's chosen category
  const onCategoryChange = (event) => {
    setChosenCategory(event.target.value);
  };

  //create single categories from api result and add "All" as an option
  useEffect(
    () =>
      setCategories([
        "All",
        ...new Set(
          eventsData.map((event) => event.classifications[0].segment.name)
        ),
      ]),
    [eventsData]
  );

  //filter categories TODO - figure out how to filter by category
  const handleFilterData = (event, category) => {
    event.preventDefault();
    if (chosenCategory === "All") {
      setFilterCat(eventsData);
    } else {
      setFilterCat(
        eventsData.filter(
          (event) => event.classifications[0].segment.name === category
        )
      );
    }
  };

  return (
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
  );
};

export default Categories;

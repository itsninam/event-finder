//Categories.js

//Modules
import { useEffect, useState } from "react";

const Categories = ({ eventsData, setChosenCategory, chosenCategory }) => {
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

  return (
    <form action="">
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
        </>
      )}
      {console.log(chosenCategory)}
    </form>
  );
};

export default Categories;

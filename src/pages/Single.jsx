// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

// Define and export the Single component which displays individual item details.
export const Single = () => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer()

  // Retrieve the 'category' and 'theId' URL parameters using useParams hook.
  const { category, theId } = useParams();
  const [data, setData] = useState(null);

  const apiCategory = category === "characters" ? "people" : category;

  // Fetch the data for the selected item based on category and ID.
  useEffect(() => {
    const url = `https://www.swapi.tech/api/${apiCategory}/${theId}`;
    console.log("Fetching URL:", url);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("DATA FETCHED:", data);
        setData(data.result);
      })
      .catch(err => console.error(err));
  }, [apiCategory, theId]);

  // Show loading text while data is being fetched.
  if (!data || !data.properties) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Left side: Image */}
        <div className="col-md-5 text-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/${category === "people" ? "characters" : category}/${theId}.jpg`}
            className="img-fluid mb-3"
            alt={data.properties.name || data.properties.title || "Sin nombre"}
            style={{ borderRadius: "10px" }}
            onError={(e) => { e.target.src = "https://placehold.co/400x400?text=No+Image" }}
          />
        </div>

        {/* Right side: Title and description */}
        <div className="col-md-7">
          {/* Display the title of the item */}
          <h1 className="display-4">{data.properties.name || data.properties.title || "Sin nombre"}</h1>

          {/* Brief description */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>
        </div>
      </div>

      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

      {/* Display item properties in a table-like format */}
      <div className="row text-danger text-center">
        {(apiCategory === "people" ? ["name", "birth_year", "gender", "height", "skin_color", "eye_color"]
          : apiCategory === "planets" ? ["name", "climate", "population", "orbital_period", "rotation_period", "diameter"]
            : ["name", "model", "starship_class", "manufacturer", "cost_in_credits", "crew"]
        ).map((key) => (
          <div key={key} className="col-md-2 mb-3">
            <h6 className="text-uppercase">{key.replace(/_/g, " ")}</h6>
            <p>{data.properties[key]}</p>
          </div>
        ))}
      </div>

      {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
      <div className="text-center">
        <Link to="/">
          <span className="btn btn-primary btn-lg" role="button">
            Back home
          </span>
        </Link>
      </div>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
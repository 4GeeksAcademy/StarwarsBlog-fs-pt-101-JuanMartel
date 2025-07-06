import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">StarWars Blog</span>
        </Link>

        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            Favourites ({store.favorites.length})
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item">Sin favoritos</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                  {fav.name}
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => dispatch({ type: "remove_favorite", payload: fav })}
                  >
                    X
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
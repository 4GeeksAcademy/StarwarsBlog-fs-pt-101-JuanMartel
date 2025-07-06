import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const [people, setPeople] = useState([]);
	const [planets, setPlanets] = useState([]);
	const [starships, setStarships] = useState([]);

	// fech de people
	useEffect(() => {
		fetch("https://www.swapi.tech/api/people/")
			.then(res => res.json())
			.then(data => setPeople(data.results))
			.catch(err => console.error(err));
	}, []);

	// fech planteas
	useEffect(() => {
		fetch("https://www.swapi.tech/api/planets/")
			.then(res => res.json())
			.then(data => setPlanets(data.results))
			.catch(err => console.error(err));
	}, []);

	// fech de naves
	useEffect(() => {
		fetch("https://www.swapi.tech/api/starships/")
			.then(res => res.json())
			.then(data => setStarships(data.results))
			.catch(err => console.error(err));
	}, []);

	// render
	const renderCards = (items, category) => {
		return items.map(item => (
			<div key={item.uid} className="card shadow-sm starwars-card">
				<img
					src={`https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`}
					className="card-img-top"
					alt={item.name}
					onError={(e) => { e.target.src = "https://placehold.co/400x400?text=No+Image" }}
				/>
				<div className="card-body">
					<h5 className="card-title">{item.name}</h5>

					<Link to={`/single/${category}/${item.uid}`} className="btn btn-primary">
						View More!
					</Link>
					<button
						className={`btn ms-2 ${store.favorites.some(fav => fav.name === item.name) ? "btn-dark" : "btn-warning"}`}
						onClick={() => dispatch({ type: "add_favorite", payload: { name: item.name } })}
					>
						⭐
					</button>
				</div>
			</div>
		));
	};


	return (
		<div className="container mt-5">
			<h2>People</h2>
			<div className="scroll-horizontal">{renderCards(people, "characters")}</div>

			<h2>Planets</h2>
			<div className="scroll-horizontal">{renderCards(planets, "planets")}</div>

			<h2>Starships</h2>
			<div className="scroll-horizontal">{renderCards(starships, "starships")}</div>
		</div>
	);
};
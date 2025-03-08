import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DogCard from "../Components/DogCard";
import "../styles.css"; 

const Search = () => {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get("https://frontend-take-home-service.fetch.com/dogs/breeds", {
        withCredentials: true,
      });
      setBreeds(response.data);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  const fetchDogs = useCallback(async () => {
    try {
      const response = await axios.get("https://frontend-take-home-service.fetch.com/dogs/search", {
        params: {
          breeds: selectedBreed ? [selectedBreed] : undefined,
          size: 10,
          from: page * 10,
          sort: `breed:${sortOrder}`, 
        },
        withCredentials: true,
      });

      const dogDetails = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs",
        response.data.resultIds,
        { withCredentials: true }
      );

      setDogs(dogDetails.data);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  }, [selectedBreed, page, sortOrder]);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  const toggleFavorite = (dogId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId];
  
      if (updatedFavorites.length === 0) {
        setMatch(null); // ✅ Reset match when no favorites remain
      }
  
      return updatedFavorites;
    });
  };
  

  const findMatch = async () => {
    if (favorites.length === 0) {
      setMatch(null); // ✅ Reset match if no favorites
      return;
    }
  
    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        favorites,
        { withCredentials: true }
      );
  
      const matchedDogId = response.data.match;
      const matchedDogResponse = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs",
        [matchedDogId],
        { withCredentials: true }
      );
  
      setMatch(matchedDogResponse.data[0]); 
    } catch (error) {
      console.error("Error finding match:", error);
    }
  };
  

  return (
    <div className="search-container">
      <h2>Search Dogs</h2>

      {/* Filters Section */}
      <div className="search-filters">
        <label>
          Filter by Breed:
          <select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
            <option value="">All Breeds</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </label>

        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort by Breed ({sortOrder === "asc" ? "Descending" : "Ascending"})
        </button>
      </div>

      {/* Dog List */}
      <div className="dog-list">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(dog.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {/* Favorite Counter */}
      <div className="favorite-count">
        <h3>Favorites: {favorites.length}</h3>
      </div>

      {/* Match Section */}
      <div className="match-section">
        <button onClick={findMatch} disabled={favorites.length === 0}>Find My Match</button>

        {match && (
          <div>
            <h2>Your Match</h2>
            <DogCard dog={match} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

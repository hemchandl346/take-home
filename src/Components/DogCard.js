import React from "react";

const DogCard = ({ dog, toggleFavorite, isFavorite }) => {
  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} width="200px" />
      <h3>{dog.name}</h3>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age} years</p>
      <p>Location: {dog.zip_code}</p>
      <button onClick={() => toggleFavorite(dog.id)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default DogCard;

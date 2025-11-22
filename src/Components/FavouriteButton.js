import React, { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function FavoriteButton({ product ,className }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("pharmaFavorites")) || [];
    const exists = storedFavorites.some(
      (item) => item.id === product.id && item.type === product.type
    );
    setIsFavorited(exists);
  }, [product]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("pharmaFavorites")) || [];

    let updatedFavorites;
    if (isFavorited) {
      updatedFavorites = storedFavorites.filter(
        (item) => !(item.id === product.id && item.type === product.type)
      );
    } else {
      updatedFavorites = [...storedFavorites, { id: product.id, type: product.type }];
    }

    localStorage.setItem("pharmaFavorites", JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);

    //  Notify other components like FavouriteproductsPage
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`absolute top-2 left-2 z-10 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer bg-white shadow-md hover:bg-red-200 transition-colors duration-300 ${className}`}
      aria-label="Toggle Favorite"
    >
      {isFavorited ? (
        <MdFavorite className="text-red-500 text-lg" />
      ) : (
        <MdFavoriteBorder className="text-gray-400 text-lg" />
      )}
    </button>
  );
}

export default FavoriteButton;
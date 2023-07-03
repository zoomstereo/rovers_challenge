import { useState } from "react";
import SearchParams from "../_types/SearchParams";

export default function useFavorite() {
    const [favorites, setFavorites] = useState(() => {
        const favorites = localStorage.getItem("favorites");
        return favorites ? JSON.parse(favorites) : [];
    });

    const addFavorite = (searchParam: SearchParams) => {
        searchParam.id = favorites.length + 1;
        const updatedFavorites = [...favorites, searchParam];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    const removeFavorite = (searchParam: SearchParams) => {
        const newArr = favorites.filter(
            (fav: SearchParams) => fav.id !== searchParam.id
        );

        localStorage.setItem("favorites", JSON.stringify(newArr));
        setFavorites(newArr);
    };

    return [favorites, addFavorite, removeFavorite];
}

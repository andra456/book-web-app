import { useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    console.log(id);
    setFavorites((prev) => {
      console.log(prev.includes(id));
      return prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
    });
  };

  return { favorites, toggleFavorite };
};

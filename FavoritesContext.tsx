import React, { createContext, useContext, useState } from "react";

type ProductData = {
  id: number;
  title: string;
};

export type FavoritesContextType = {
  favorites: ProductData[];
  addToFavorites: (product: ProductData) => void;
  removeFromFavorites: (productId: number) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

type FavoritesProviderProps = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<ProductData[]>([]);

  const addToFavorites = (product: ProductData) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((product) => product.id !== productId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

import * as React from "react";
import { favouriteRepositoriesStorageKey } from "./api";
import type { FavouriteRepositoriesOnStorage } from "./types";

export const useFavouriteRepositoriesFromOtherContextUpdateEffect = (
  onFavouriteRepositoriesFromOtherContextUpdate: (
    favourites: FavouriteRepositoriesOnStorage
  ) => void
): void => {
  React.useEffect(() => {
    const storageEventType = "storage";
    const handleStorageEvent = ({ key, newValue }: StorageEvent): void => {
      if (key === favouriteRepositoriesStorageKey) {
        onFavouriteRepositoriesFromOtherContextUpdate(
          JSON.parse(newValue ?? "{}") as FavouriteRepositoriesOnStorage
        );
      }
    };
    window.addEventListener(storageEventType, handleStorageEvent);

    return () => {
      window.removeEventListener(storageEventType, handleStorageEvent);
    };
  }, [onFavouriteRepositoriesFromOtherContextUpdate]);
};

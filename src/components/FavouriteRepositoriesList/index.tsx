import * as React from "react";

import {
  favouriteRepositoriesStorageKey,
  fetchFavouriteRepositories,
} from "../../app/api";
import { useFavouriteRepositoriesFromOtherContextUpdateEffect } from "../../app/hooks";
import FavouriteRepositoriesListView from "./FavouriteRepositoriesListView";
import type { FavouriteRepositoriesOnStorage } from "../../app/types";

const FavouriteRepositoriesList = (): JSX.Element => {
  const [favouriteRepositories, setFavouriteRepositories] =
    React.useState<FavouriteRepositoriesOnStorage>(
      fetchFavouriteRepositories(favouriteRepositoriesStorageKey)
    );

  useFavouriteRepositoriesFromOtherContextUpdateEffect(
    (favouriteRepositoriesFromOtherContext) => {
      setFavouriteRepositories(favouriteRepositoriesFromOtherContext);
    }
  );

  return (
    <FavouriteRepositoriesListView
      repositoriesFromStorage={favouriteRepositories}
    />
  );
};

export default FavouriteRepositoriesList;

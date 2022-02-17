import * as React from "react";

import {
  favouritedRepositoriesStorageKey,
  fetchFavouritedRepositories,
} from "../../app/api";
import RepositoriesList from "../RepositoriesList";
import type { UiRepository } from "../../app/types";

const FavouriteRepositoriesList = (): JSX.Element => {
  const favouriteRepositoriesFromStorage = fetchFavouritedRepositories(
    favouritedRepositoriesStorageKey
  );
  const favouriteRepositoriesToDisplay: UiRepository[] = Object.keys(
    favouriteRepositoriesFromStorage
  ).map<UiRepository>((currentRepositoryId) => ({
    id: currentRepositoryId,
    ...favouriteRepositoriesFromStorage[currentRepositoryId],
  }));

  return favouriteRepositoriesToDisplay.length ? (
    <RepositoriesList repositories={favouriteRepositoriesToDisplay} />
  ) : (
    <p className="flex justify-center mt-6">
      "No repository has been favourited yet!"
    </p>
  );
};

export default FavouriteRepositoriesList;

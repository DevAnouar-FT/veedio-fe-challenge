import * as React from "react";

import RepositoriesList from "../RepositoriesList";
import type {
  FavouriteRepositoriesOnStorage,
  UiRepository,
} from "../../app/types";

interface Props {
  repositoriesFromStorage: FavouriteRepositoriesOnStorage;
}

const FavouriteRepositoriesListView = ({
  repositoriesFromStorage,
}: Props): JSX.Element => {
  const favouriteRepositoriesToDisplay: UiRepository[] = Object.keys(
    repositoriesFromStorage
  ).map<UiRepository>((currentRepositoryId) => ({
    id: currentRepositoryId,
    ...repositoriesFromStorage[currentRepositoryId],
  }));

  return favouriteRepositoriesToDisplay.length ? (
    <RepositoriesList repositories={favouriteRepositoriesToDisplay} />
  ) : (
    <p className="flex justify-center mt-6">
      No repository has been favourite yet!
    </p>
  );
};

export default FavouriteRepositoriesListView;

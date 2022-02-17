import * as React from "react";

import { FetchStatus, UiRepository } from "../../app/types";
import RepositoriesList from "../RepositoriesList";
import RepositoryInformations from "../RepositoryInformations";

interface Props {
  repositories: UiRepository[];
  fetchStatus: FetchStatus;
  onFavouritedRepositoryChange: React.ComponentProps<
    typeof RepositoryInformations.FavouriteToggle
  >["onFavouritedChange"];
}

const TrendingRepositoriesListView = ({
  repositories,
  fetchStatus,
  onFavouritedRepositoryChange,
}: Props): JSX.Element => {
  const textToDisplayByFetchStatusWhenNoRepositoryIsRendered: Record<
    FetchStatus,
    string
  > = {
    loading: "Loading...",
    idle: "No repository has been found.",
    failed: "An error has occured!",
  };

  return fetchStatus === FetchStatus.IDLE && repositories.length ? (
    <RepositoriesList repositories={repositories}>
      {(repositoryId) => (
        <RepositoryInformations.FavouriteToggle
          repositoryId={repositoryId}
          onFavouritedChange={onFavouritedRepositoryChange}
        />
      )}
    </RepositoriesList>
  ) : (
    <p className="flex justify-center mt-6">
      {textToDisplayByFetchStatusWhenNoRepositoryIsRendered[fetchStatus]}
    </p>
  );
};

export default TrendingRepositoriesListView;

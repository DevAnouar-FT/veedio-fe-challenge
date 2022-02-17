import * as React from "react";

import { FetchStatus, UiRepository } from "../../app/types";
import List from "../../ui/List";
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
    <List>
      {repositories.map<JSX.Element>(
        ({ id, name, starsCount, githubLink, description }) => (
          <List.Item key={id}>
            <RepositoryInformations
              id={id}
              name={name}
              starsCount={starsCount}
              githubLink={githubLink}
              description={description}
            >
              <RepositoryInformations.FavouriteToggle
                repositoryId={id}
                onFavouritedChange={onFavouritedRepositoryChange}
              />
            </RepositoryInformations>
          </List.Item>
        )
      )}
    </List>
  ) : (
    <p className="flex justify-center mt-6">
      {textToDisplayByFetchStatusWhenNoRepositoryIsRendered[fetchStatus]}
    </p>
  );
};

export default TrendingRepositoriesListView;

import * as React from "react";

import { FetchStatus } from "../../app/types";
import List from "../../ui/List";
import RepositoryInformations from "../RepositoryInformations";

type RepositoryData = Omit<
  React.ComponentProps<typeof RepositoryInformations>,
  "children"
>;

interface Props {
  repositories: RepositoryData[];
  fetchStatus: FetchStatus;
  onFavouritedRepositoryChange(newFavouritedStatusForRepository: {
    repositoryId: string;
    favourited: boolean;
  }): void;
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
                onFavouritedChange={(favourited) => {
                  onFavouritedRepositoryChange({
                    repositoryId: id,
                    favourited,
                  });
                }}
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

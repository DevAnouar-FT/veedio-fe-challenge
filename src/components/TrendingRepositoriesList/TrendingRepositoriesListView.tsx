import * as React from "react";

import { FetchStatus } from "../../app/types";
import List from "../../ui/List";
import RepositoryInformations from "../RepositoryInformations";

type RepositoryData = React.ComponentProps<typeof RepositoryInformations>;

interface Props {
  repositories: RepositoryData[];
  fetchStatus: FetchStatus;
}

const TrendingRepositoriesListView = ({
  repositories,
  fetchStatus,
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
            />
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

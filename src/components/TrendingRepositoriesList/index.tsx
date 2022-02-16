import * as React from "react";

import { fetchTrendingRepositoriesCreatedInLastSevenDays } from "../../app/api";
import { FetchStatus } from "../../app/types";
import TrendingRepositoriesListView from "./TrendingRepositoriesListView";

type Repositories = React.ComponentProps<
  typeof TrendingRepositoriesListView
>["repositories"];

const TrendingRepositoriesList = (): JSX.Element => {
  const [trendingRepositories, setTrendingRepositories] =
    React.useState<Repositories>([]);

  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );

  React.useEffect(() => {
    const initTrendingRepositories = async (): Promise<void> => {
      try {
        setFetchStatus(FetchStatus.LOADING);
        const fetchedRepositoriesData =
          await fetchTrendingRepositoriesCreatedInLastSevenDays();

        setTrendingRepositories(
          fetchedRepositoriesData.items.map<Repositories[0]>(
            ({
              id,
              name,
              stargazers_count: starsCount,
              html_url: githubLink,
              description,
            }) => ({
              id: `${id}`,
              name,
              starsCount,
              githubLink,
              description: description ?? undefined,
            })
          )
        );
        setFetchStatus(FetchStatus.IDLE);
      } catch (error) {
        setFetchStatus(FetchStatus.FAILED);
        console.error(error);
      }
    };

    initTrendingRepositories();
  }, []);

  return (
    <TrendingRepositoriesListView
      repositories={trendingRepositories}
      fetchStatus={fetchStatus}
    />
  );
};

export default TrendingRepositoriesList;

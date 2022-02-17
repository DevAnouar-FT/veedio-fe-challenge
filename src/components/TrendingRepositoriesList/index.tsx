import * as React from "react";

import {
  addRepositoryToFavourites,
  fetchTrendingRepositoriesCreatedInLastSevenDays,
  removeRepositoryFromFavourites,
} from "../../app/api";
import { FetchStatus, UiRepository } from "../../app/types";
import TrendingRepositoriesListView from "./TrendingRepositoriesListView";

type Repositories = UiRepository[];

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

  const handleFavouritedRepositoryChange: React.ComponentProps<
    typeof TrendingRepositoriesListView
  >["onFavouritedRepositoryChange"] = ({ repositoryId, favourited }) => {
    favourited
      ? addRepositoryToFavourites(
          trendingRepositories.find(
            (currentRepository) => currentRepository.id === repositoryId
          )!
        )
      : removeRepositoryFromFavourites(repositoryId);
  };

  return (
    <TrendingRepositoriesListView
      repositories={trendingRepositories}
      fetchStatus={fetchStatus}
      onFavouritedRepositoryChange={handleFavouritedRepositoryChange}
    />
  );
};

export default TrendingRepositoriesList;

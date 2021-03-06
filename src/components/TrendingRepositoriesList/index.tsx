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

  const componentIsMounted = React.useRef<boolean>(false);

  React.useEffect(() => {
    componentIsMounted.current = true;

    const initTrendingRepositories = async (): Promise<void> => {
      try {
        setFetchStatus(FetchStatus.LOADING);
        const fetchedRepositoriesData =
          await fetchTrendingRepositoriesCreatedInLastSevenDays();

        if (componentIsMounted.current) {
          setTrendingRepositories(
            fetchedRepositoriesData.items.map<UiRepository>(
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
        }
      } catch (error) {
        if (componentIsMounted.current) {
          setFetchStatus(FetchStatus.FAILED);
          console.error(error);
        }
      }
    };

    initTrendingRepositories();

    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const handleFavouriteStatusOfRepositoryChange: React.ComponentProps<
    typeof TrendingRepositoriesListView
  >["onFavouriteStatusOfRepositoryChange"] = ({ repositoryId, favourite }) => {
    favourite
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
      onFavouriteStatusOfRepositoryChange={
        handleFavouriteStatusOfRepositoryChange
      }
    />
  );
};

export default TrendingRepositoriesList;

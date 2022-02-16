import * as React from "react";
import List from "../../ui/List";
import RepositoryInformations from "../RepositoryInformations";
import { fetchTrendingRepositoriesCreatedInLastSevenDays } from "../../app/api";
import { FetchStatus } from "../../app/types";

type RepositoryData = React.ComponentProps<typeof RepositoryInformations>;

const TrendingRepositoriesList = (): JSX.Element | null => {
  const [trendingRepositories, setTrendingRepositories] = React.useState<
    RepositoryData[]
  >([]);

  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );
  const textToDisplayByFetchStatusWhenNoRepositoryIsRendered: Record<
    FetchStatus,
    string
  > = {
    loading: "Loading...",
    idle: "No repository has been found.",
    failed: "An error has occured!",
  };

  React.useEffect(() => {
    const initTrendingRepositories = async (): Promise<void> => {
      try {
        setFetchStatus(FetchStatus.LOADING);
        const fetchedRepositoriesData =
          await fetchTrendingRepositoriesCreatedInLastSevenDays();

        setTrendingRepositories(
          fetchedRepositoriesData.items.map<RepositoryData>(
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

  return fetchStatus === FetchStatus.IDLE && trendingRepositories.length ? (
    <List>
      {trendingRepositories.map<JSX.Element>(
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

export default TrendingRepositoriesList;

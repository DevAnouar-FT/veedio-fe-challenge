import * as React from "react";
import List from "../../ui/List";
import RepositoryInformations from "../RepositoryInformations";
import { fetchTrendingRepositoriesCreatedInLastSevenDays } from "../../app/api";

type RepositoryData = React.ComponentProps<typeof RepositoryInformations>;

const TrendingRepositoriesList = (): JSX.Element | null => {
  const [trendingRepositories, setTrendingRepositories] = React.useState<
    RepositoryData[]
  >([]);

  React.useEffect(() => {
    (async () => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return trendingRepositories.length ? (
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
  ) : null;
};

export default TrendingRepositoriesList;

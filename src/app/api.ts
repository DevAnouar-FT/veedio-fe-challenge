import { trendingRepositoriesCreatedInLastSevenDays as trendingRepositoriesCreatedInLastSevenDaysEndpoint } from "./endpoints";
import { UiRepository } from "./types";

export interface GitHubRepositoriesApiData {
  items: {
    id: number;
    name: string;
    stargazers_count: number;
    html_url: string;
    description: string | null;
    created_at: string;
  }[];
}

export const fetchTrendingRepositoriesCreatedInLastSevenDays =
  async (): Promise<GitHubRepositoriesApiData | never> => {
    const response = await fetch(
      trendingRepositoriesCreatedInLastSevenDaysEndpoint
    );

    if (!response.ok) {
      return Promise.reject<never>(
        "An error has occured while trying to fetch the list of trending repositories" +
          " created during the last 7 days." +
          ` HTTP Error: status code ${response.status}.`
      );
    }

    return response.json() as Promise<GitHubRepositoriesApiData>;
  };

const favouritedRepositoriesStorageKey = "favouritedRepositories";

const fetchFavouritedRepositories = (favouritesStorageKey: string) =>
  JSON.parse(
    localStorage.getItem(favouritesStorageKey) ?? "[]"
  ) as UiRepository[];

export const addRepositoryToFavourites = (repository: UiRepository): void => {
  localStorage.setItem(
    favouritedRepositoriesStorageKey,
    JSON.stringify([
      repository,
      ...fetchFavouritedRepositories(favouritedRepositoriesStorageKey),
    ])
  );
};

export const removeRepositoryFromFavourites = (
  repositoryId: UiRepository["id"]
): void => {
  localStorage.setItem(
    favouritedRepositoriesStorageKey,
    JSON.stringify(
      fetchFavouritedRepositories(favouritedRepositoriesStorageKey).filter(
        (currentRepository) => currentRepository.id !== repositoryId
      )
    )
  );
};

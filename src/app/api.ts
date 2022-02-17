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

export const favouritedRepositoriesStorageKey = "favouritedRepositories";

export const fetchFavouritedRepositories = (favouritesStorageKey: string) =>
  JSON.parse(localStorage.getItem(favouritesStorageKey) ?? "{}") as Record<
    UiRepository["id"],
    Omit<UiRepository, "id">
  >;

export const addRepositoryToFavourites = (repository: UiRepository): void => {
  const { id: repositoryId, ...otherRepositoryData } = repository;
  localStorage.setItem(
    favouritedRepositoriesStorageKey,
    JSON.stringify({
      [repositoryId]: otherRepositoryData,
      ...fetchFavouritedRepositories(favouritedRepositoriesStorageKey),
    })
  );
};

export const removeRepositoryFromFavourites = (
  repositoryId: UiRepository["id"]
): void => {
  const { [repositoryId]: repositoryToRemove, ...otherRepositories } =
    fetchFavouritedRepositories(favouritedRepositoriesStorageKey);

  localStorage.setItem(
    favouritedRepositoriesStorageKey,
    JSON.stringify(otherRepositories)
  );
};

export const isRepositoryFavourited = (
  repositoryId: UiRepository["id"]
): boolean =>
  !!fetchFavouritedRepositories(favouritedRepositoriesStorageKey)[repositoryId];

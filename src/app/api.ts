import { trendingRepositoriesCreatedInLastSevenDays as trendingRepositoriesCreatedInLastSevenDaysEndpoint } from "./endpoints";
import type { FavouriteRepositoriesOnStorage, UiRepository } from "./types";

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

export const favouriteRepositoriesStorageKey = "favouriteRepositories";

export const fetchFavouriteRepositories = (favouritesStorageKey: string) =>
  JSON.parse(
    localStorage.getItem(favouritesStorageKey) ?? "{}"
  ) as FavouriteRepositoriesOnStorage;

export const addRepositoryToFavourites = (repository: UiRepository): void => {
  const { id: repositoryId, ...otherRepositoryData } = repository;
  localStorage.setItem(
    favouriteRepositoriesStorageKey,
    JSON.stringify({
      [repositoryId]: otherRepositoryData,
      ...fetchFavouriteRepositories(favouriteRepositoriesStorageKey),
    })
  );
};

export const removeRepositoryFromFavourites = (
  repositoryId: UiRepository["id"]
): void => {
  const { [repositoryId]: repositoryToRemove, ...otherRepositories } =
    fetchFavouriteRepositories(favouriteRepositoriesStorageKey);

  localStorage.setItem(
    favouriteRepositoriesStorageKey,
    JSON.stringify(otherRepositories)
  );
};

export const isRepositoryFavourite = (
  repositoryId: UiRepository["id"]
): boolean =>
  !!fetchFavouriteRepositories(favouriteRepositoriesStorageKey)[repositoryId];

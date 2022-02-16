import { trendingRepositoriesCreatedInLastSevenDays as trendingRepositoriesCreatedInLastSevenDaysEndpoint } from "./endpoints";

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

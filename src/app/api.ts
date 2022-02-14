export interface GitHubRepositoriesApiData {
  items: {
    id: number;
    name: string;
    stargazers_count: number;
    html_url: string;
    description: string | null;
  }[];
  total_count: number;
}

export const trendingRepositoriesCreatedInLastSevenDaysEndpoint =
  ((): string => {
    const dateFromSevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const formattedDateFromSevenDaysAgo = [
      dateFromSevenDaysAgo.getFullYear(),
      dateFromSevenDaysAgo.getMonth() + 1,
      dateFromSevenDaysAgo.getDate(),
    ]
      .map<string>((currentDatePart) =>
        currentDatePart.toLocaleString(undefined, {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
      )
      .join("-");

    return (
      "https://api.github.com/search/repositories" +
      `?q=created:>${formattedDateFromSevenDaysAgo}&sort=stars&order=desc`
    );
  })();

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

    return response.json() as Promise<{
      items: {
        id: number;
        name: string;
        stargazers_count: number;
        html_url: string;
        description: string | null;
      }[];
      total_count: number;
    }>;
  };

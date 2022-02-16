import { getDateFromSevenDaysAgo } from "./utils";

export const repositories = "https://api.github.com/search/repositories";

export const trendingRepositoriesCreatedInLastSevenDays = ((): string => {
  const dateFromSevenDaysAgo = getDateFromSevenDaysAgo();
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
  const createdInTheLastSevenDaysQueryParameter = `created:>${formattedDateFromSevenDaysAgo}`;

  return `${repositories}?${new URLSearchParams({
    q: createdInTheLastSevenDaysQueryParameter,
    sort: "stars",
    order: "desc",
  })}`;
})();

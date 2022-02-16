import { getTimeFromIsoRepresentation } from "../app/utils";
import type { GitHubRepositoriesApiData } from "../app/api";

export const githubRepositories: GitHubRepositoriesApiData["items"] = [
  ...Array(30),
].map<GitHubRepositoriesApiData["items"][0]>((_, index) => ({
  id: Math.random() * 100000000,
  name: "A Trending Repository",
  html_url: "https://github.com/user/repo",
  stargazers_count: parseInt(Math.random() * 1000 + ""),
  description: "Some nice desription.",
  created_at: new Date(
    index < 20 ? Date.now() : Date.UTC(2020, 2, 15)
  ).toISOString(),
}));

export const getGithubRepositoriesCreatedSinceDateFrom = (
  repositories: GitHubRepositoriesApiData["items"],
  creationDate: Date
) =>
  repositories.filter(
    (currentRepository) =>
      getTimeFromIsoRepresentation(currentRepository.created_at) >
      creationDate.getTime()
  );

export const sortGithubRepositoriesByStarsCountInDescendingOrder = (
  repositories: GitHubRepositoriesApiData["items"]
) =>
  [...repositories].sort(
    (currentRepository, nextRepository) =>
      nextRepository.stargazers_count - currentRepository.stargazers_count
  );

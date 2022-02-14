import { DefaultRequestBody, PathParams, rest } from "msw";
import {
  GitHubRepositoriesApiData,
  trendingRepositoriesCreatedInLastSevenDaysEndpoint,
} from "../app/api";

export const handlers = [
  rest.get<DefaultRequestBody, PathParams, GitHubRepositoriesApiData>(
    trendingRepositoriesCreatedInLastSevenDaysEndpoint,
    (_request, response, context) =>
      response(
        context.status(200),
        context.json({
          total_count: 30,
          items: [...Array(30)].map<GitHubRepositoriesApiData["items"][0]>(
            (_, id) => ({
              id,
              name: "A Trending Repository",
              html_url: "https://github.com/user/repo",
              stargazers_count: 868,
              description: "Some nice desription.",
            })
          ),
        })
      )
  ),
];

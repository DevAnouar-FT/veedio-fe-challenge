import { DefaultRequestBody, PathParams, rest } from "msw";

import { repositories as repositoriesEndpoint } from "../app/endpoints";
import {
  getGithubRepositoriesCreatedSinceDateFrom,
  githubRepositories,
  sortGithubRepositoriesByStarsCountInDescendingOrder,
} from "./dummies";
import type { GitHubRepositoriesApiData } from "../app/api";

export const populatedListOfGithubRepositoriesHandler = rest.get<
  DefaultRequestBody,
  PathParams,
  GitHubRepositoriesApiData
>(repositoriesEndpoint, ({ url: { searchParams } }, response, context) => {
  const createdSearchParam = searchParams.get("q");
  const sortSearchParam = searchParams.get("sort");
  const orderSearchParam = searchParams.get("order");

  const filteredGithubRepositoriesUsingCreatedSearchParam =
    createdSearchParam?.includes("created:>")
      ? getGithubRepositoriesCreatedSinceDateFrom(
          githubRepositories,
          new Date(createdSearchParam.replace("created:>", ""))
        )
      : githubRepositories;

  return response(
    context.status(200),
    context.json({
      items:
        sortSearchParam === "stars" && orderSearchParam === "desc"
          ? sortGithubRepositoriesByStarsCountInDescendingOrder(
              filteredGithubRepositoriesUsingCreatedSearchParam
            )
          : githubRepositories,
    })
  );
});

export const emptyListOfGithubRepositoriesHandler = rest.get<
  DefaultRequestBody,
  PathParams,
  GitHubRepositoriesApiData
>(repositoriesEndpoint, (_, response, context) =>
  response(context.status(200), context.json({ items: [] }))
);

export const erroneousFetchingOfGithubRepositoriesHandler = rest.get<
  DefaultRequestBody,
  PathParams,
  GitHubRepositoriesApiData
>(repositoriesEndpoint, (_, response, context) =>
  response(context.status(400), context.json({ items: [] }))
);

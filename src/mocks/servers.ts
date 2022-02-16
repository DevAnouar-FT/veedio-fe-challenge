import { setupServer } from "msw/node";
import {
  emptyListOfGithubRepositoriesHandler,
  erroneousFetchingOfGithubRepositoriesHandler,
  fullListOfGithubRepositoriesHandler,
} from "./handlers";

export const fullListOfRepositoriesServer = setupServer(
  fullListOfGithubRepositoriesHandler
);
export const emptyListOfRepositoriesServer = setupServer(
  emptyListOfGithubRepositoriesHandler
);
export const erroneousFetchingOfGithubRepositoriesServer = setupServer(
  erroneousFetchingOfGithubRepositoriesHandler
);

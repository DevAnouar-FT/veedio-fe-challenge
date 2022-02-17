import { setupServer } from "msw/node";
import {
  emptyListOfGithubRepositoriesHandler,
  erroneousFetchingOfGithubRepositoriesHandler,
  populatedListOfGithubRepositoriesHandler,
} from "./handlers";

export const populatedListOfRepositoriesServer = setupServer(
  populatedListOfGithubRepositoriesHandler
);
export const emptyListOfRepositoriesServer = setupServer(
  emptyListOfGithubRepositoriesHandler
);
export const erroneousFetchingOfGithubRepositoriesServer = setupServer(
  erroneousFetchingOfGithubRepositoriesHandler
);

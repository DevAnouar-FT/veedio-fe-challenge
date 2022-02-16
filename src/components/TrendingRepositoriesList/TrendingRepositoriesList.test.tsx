import { render, screen, waitFor } from "@testing-library/react";
import TrendingRepositoriesList from ".";
import { getDateFromSevenDaysAgo } from "../../app/utils";
import {
  getGithubRepositoriesCreatedSinceDateFrom,
  githubRepositories,
  sortGithubRepositoriesByStarsCountInDescendingOrder,
} from "../../mocks/dummies";
import {
  emptyListOfRepositoriesServer,
  erroneousFetchingOfGithubRepositoriesServer,
  fullListOfRepositoriesServer,
} from "../../mocks/servers";

describe("components/TrendingRepositoriesList.tsx", () => {
  describe("Using fullListOfRepositoriesServer", () => {
    beforeAll(() => {
      fullListOfRepositoriesServer.listen();
    });

    afterEach(() => {
      fullListOfRepositoriesServer.resetHandlers();
    });

    afterAll(() => {
      fullListOfRepositoriesServer.close();
    });

    it(
      "Should load and display a list of trending repositories created during the last 7 days," +
        " and sorted by stars count in descending order",
      async () => {
        const expectedRepositoriesToBeFetched =
          sortGithubRepositoriesByStarsCountInDescendingOrder(
            getGithubRepositoriesCreatedSinceDateFrom(
              githubRepositories,
              getDateFromSevenDaysAgo()
            )
          );
        render(<TrendingRepositoriesList />);

        const repositoriesListItemsElements = await screen.findAllByRole(
          "listitem"
        );

        expect(repositoriesListItemsElements).toHaveLength(
          expectedRepositoriesToBeFetched.length
        );
        expect(
          screen
            .getAllByText(/stars/)
            .map<number>((currentElement) =>
              parseInt(currentElement.textContent ?? "0")
            )
            .toString()
        ).toEqual<string>(
          expectedRepositoriesToBeFetched
            .map<number>(
              (currentRepository) => currentRepository.stargazers_count
            )
            .toString()
        );
      }
    );

    it("Should display 'Loading...' when the repositories list is being fetched", async () => {
      let requestHasBeenInitiated = false;
      fullListOfRepositoriesServer.events.on("request:start", () => {
        requestHasBeenInitiated = true;
      });

      render(<TrendingRepositoriesList />);

      await waitFor(() => expect(requestHasBeenInitiated).toBe<boolean>(true));

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("When the retrieved list of trending repositories is empty", () => {
    let apiResponseHasBeenReturned = false;

    beforeAll(() => {
      emptyListOfRepositoriesServer.events.on("response:mocked", () => {
        apiResponseHasBeenReturned = true;
      });
      emptyListOfRepositoriesServer.listen();
    });

    afterEach(() => {
      emptyListOfRepositoriesServer.resetHandlers();
      apiResponseHasBeenReturned = false;
    });

    afterAll(() => {
      emptyListOfRepositoriesServer.close();
    });

    it("Should not display a list element", async () => {
      render(<TrendingRepositoriesList />);

      await waitFor(() =>
        expect(apiResponseHasBeenReturned).toBe<boolean>(true)
      );

      expect(screen.queryByRole("list")).toBeNull();
    });

    it("Should display the 'No repository has been found.' message", async () => {
      render(<TrendingRepositoriesList />);

      await waitFor(() =>
        expect(apiResponseHasBeenReturned).toBe<boolean>(true)
      );

      expect(
        screen.getByText("No repository has been found.")
      ).toBeInTheDocument();
    });
  });

  it("Should display 'An error has occured!' when the server respond with an error", async () => {
    erroneousFetchingOfGithubRepositoriesServer.listen();

    render(<TrendingRepositoriesList />);

    const errorMessageElement = await screen.findByText(
      "An error has occured!"
    );

    expect(errorMessageElement).toBeInTheDocument();

    erroneousFetchingOfGithubRepositoriesServer.close();
  });
});

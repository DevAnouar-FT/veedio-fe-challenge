import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { LocalStorageMock } from "@react-mock/localstorage";

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
  populatedListOfRepositoriesServer,
} from "../../mocks/servers";
import {
  favouriteRepositoriesStorageKey,
  isRepositoryFavourite,
} from "../../app/api";
import type { FavouriteRepositoriesOnStorage } from "../../app/types";

describe("components/TrendingRepositoriesList", () => {
  describe("Using populatedListOfRepositoriesServer", () => {
    beforeAll(() => {
      populatedListOfRepositoriesServer.listen();
    });

    afterEach(() => {
      populatedListOfRepositoriesServer.resetHandlers();
    });

    afterAll(() => {
      populatedListOfRepositoriesServer.close();
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
      populatedListOfRepositoriesServer.events.on("request:start", () => {
        requestHasBeenInitiated = true;
      });

      render(<TrendingRepositoriesList />);

      await waitFor(() => expect(requestHasBeenInitiated).toBe<boolean>(true));

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it(
      "Should allow to favourite a repository that is not favourite" +
        ", (eg. not stored in the favouriteRepositories on the local storage)" +
        ", and store it on the local storage",
      async () => {
        const repositoryToFavourite = getGithubRepositoriesCreatedSinceDateFrom(
          githubRepositories,
          getDateFromSevenDaysAgo()
        )[0];
        render(
          <LocalStorageMock items={{ [favouriteRepositoriesStorageKey]: "{}" }}>
            <TrendingRepositoriesList />
          </LocalStorageMock>
        );

        const repositoryDataWrapperElement = await screen.findAllByLabelText(
          `Name: ${repositoryToFavourite.name}`,
          { selector: "div" }
        );
        const repositoryFavouriteToggle = within(
          repositoryDataWrapperElement[0]
        ).getByRole("switch");
        fireEvent.click(repositoryFavouriteToggle);

        expect(
          repositoryFavouriteToggle.getAttribute("aria-checked")
        ).toEqual<string>("true");
        expect(
          isRepositoryFavourite(`${repositoryToFavourite.id}`)
        ).toBe<boolean>(true);
      }
    );

    it(
      "Should unfavourite a repository that is already favourite" +
        ", (eg. stored in the favouriteRepositories on the local storage)" +
        ", and remove it from the local storage",
      async () => {
        const repositoryToUnfavourite =
          getGithubRepositoriesCreatedSinceDateFrom(
            githubRepositories,
            getDateFromSevenDaysAgo()
          )[0];
        render(
          <LocalStorageMock
            items={{
              [favouriteRepositoriesStorageKey]: JSON.stringify({
                [repositoryToUnfavourite.id]: {
                  name: repositoryToUnfavourite.name,
                  githubLink: repositoryToUnfavourite.html_url,
                  starsCount: repositoryToUnfavourite.stargazers_count,
                  description: repositoryToUnfavourite.description ?? undefined,
                },
              } as FavouriteRepositoriesOnStorage),
            }}
          >
            <TrendingRepositoriesList />
          </LocalStorageMock>
        );

        const repositoryDataWrapperElement = await screen.findAllByLabelText(
          `Name: ${repositoryToUnfavourite.name}`,
          { selector: "div" }
        );
        const repositoryFavouriteToggle = within(
          repositoryDataWrapperElement[0]
        ).getByRole("switch");

        expect(
          repositoryFavouriteToggle.getAttribute("aria-checked")
        ).toEqual<string>("true");

        fireEvent.click(repositoryFavouriteToggle);

        expect(
          repositoryFavouriteToggle.getAttribute("aria-checked")
        ).toEqual<string>("false");
        expect(
          isRepositoryFavourite(`${repositoryToUnfavourite.id}`)
        ).toBe<boolean>(false);
      }
    );

    describe("When the favourites are updated on another document context", () => {
      it("Should mark a repository as favorite after it has been marked as favourite within another document", async () => {
        const repositoryTofavourite = getGithubRepositoriesCreatedSinceDateFrom(
          githubRepositories,
          getDateFromSevenDaysAgo()
        )[0];
        render(<TrendingRepositoriesList />);
        const repositoryDataWrapperElement = await screen.findAllByLabelText(
          `Name: ${repositoryTofavourite.name}`,
          { selector: "div" }
        );
        const repositoryFavouriteToggle = within(
          repositoryDataWrapperElement[0]
        ).getByRole("switch");

        fireEvent(
          window,
          new StorageEvent("storage", {
            key: favouriteRepositoriesStorageKey,
            newValue: JSON.stringify({
              [repositoryTofavourite.id]: {
                name: repositoryTofavourite.name,
                githubLink: repositoryTofavourite.html_url,
                starsCount: repositoryTofavourite.stargazers_count,
                description: repositoryTofavourite.description ?? undefined,
              },
            } as FavouriteRepositoriesOnStorage),
          })
        );

        expect(
          repositoryFavouriteToggle.getAttribute("aria-checked")
        ).toEqual<string>("true");
      });

      it("Should unmark a repository as favorite after it has been unfavourited within another document", async () => {
        const repositoryToUnfavourite =
          getGithubRepositoriesCreatedSinceDateFrom(
            githubRepositories,
            getDateFromSevenDaysAgo()
          )[0];
        render(
          <LocalStorageMock
            items={{
              [favouriteRepositoriesStorageKey]: JSON.stringify({
                [repositoryToUnfavourite.id]: {
                  name: repositoryToUnfavourite.name,
                  githubLink: repositoryToUnfavourite.html_url,
                  starsCount: repositoryToUnfavourite.stargazers_count,
                  description: repositoryToUnfavourite.description ?? undefined,
                },
              } as FavouriteRepositoriesOnStorage),
            }}
          >
            <TrendingRepositoriesList />
          </LocalStorageMock>
        );
        const repositoryDataWrapperElement = await screen.findAllByLabelText(
          `Name: ${repositoryToUnfavourite.name}`,
          { selector: "div" }
        );
        const repositoryFavouriteToggle = within(
          repositoryDataWrapperElement[0]
        ).getByRole("switch");

        fireEvent(
          window,
          new StorageEvent("storage", {
            key: favouriteRepositoriesStorageKey,
            newValue: "{}",
          })
        );

        expect(
          repositoryFavouriteToggle.getAttribute("aria-checked")
        ).toEqual<string>("false");
      });
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

import * as React from "react";
import { render, screen } from "@testing-library/react";
import { LocalStorageMock } from "@react-mock/localstorage";
import FavouriteRepositoriesList from ".";
import { favouritedRepositoriesStorageKey } from "../../app/api";
import type { UiRepository } from "../../app/types";

describe("components/FavouriteRepositoriesList", () => {
  it("Should display a list of already favourited repositories", () => {
    const favouritedRepositoriesWithinStorage: Record<
      UiRepository["id"],
      Omit<UiRepository, "id">
    > = {
      "123456": {
        name: "Repository 1",
        githubLink: "http://github.com/user/repo",
        starsCount: 565,
        description: "Some Description",
      },
      "654123": {
        name: "Repository 2",
        githubLink: "http://github.com/user/repo",
        starsCount: 565,
        description: "Some Description",
      },
    };
    render(
      <LocalStorageMock
        items={{
          [favouritedRepositoriesStorageKey]: JSON.stringify(
            favouritedRepositoriesWithinStorage
          ),
        }}
      >
        <FavouriteRepositoriesList />
      </LocalStorageMock>
    );

    const favouriteRepositoriesListItems = screen.getAllByRole("listitem");

    expect(favouriteRepositoriesListItems.length).toEqual<number>(
      Object.keys(favouritedRepositoriesWithinStorage).length
    );
  });

  it(
    "Should display the 'No repository has been favourited yet!' message instead of a list," +
      " when there is no favourite repository stored on the local storage",
    () => {
      render(
        <LocalStorageMock
          items={{
            [favouritedRepositoriesStorageKey]: "{}",
          }}
        >
          <FavouriteRepositoriesList />
        </LocalStorageMock>
      );

      const favouriteRepositoriesListElement = screen.queryByRole("list");
      const messageElement = screen.getByText(
        /No repository has been favourited yet!/
      );

      expect(favouriteRepositoriesListElement).not.toBeInTheDocument();
      expect(messageElement).toBeInTheDocument();
    }
  );
});

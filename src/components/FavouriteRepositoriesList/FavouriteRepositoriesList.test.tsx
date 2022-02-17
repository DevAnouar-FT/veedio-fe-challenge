import * as React from "react";
import { render, screen } from "@testing-library/react";
import { LocalStorageMock } from "@react-mock/localstorage";

import FavouriteRepositoriesList from ".";
import { favouriteRepositoriesStorageKey } from "../../app/api";
import type { FavouriteRepositoriesOnStorage } from "../../app/types";

describe("components/FavouriteRepositoriesList", () => {
  it("Should display a list of already favourite repositories", () => {
    const favouriteRepositoriesWithinStorage: FavouriteRepositoriesOnStorage = {
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
          [favouriteRepositoriesStorageKey]: JSON.stringify(
            favouriteRepositoriesWithinStorage
          ),
        }}
      >
        <FavouriteRepositoriesList />
      </LocalStorageMock>
    );

    const favouriteRepositoriesListItems = screen.getAllByRole("listitem");

    expect(favouriteRepositoriesListItems.length).toEqual<number>(
      Object.keys(favouriteRepositoriesWithinStorage).length
    );
  });

  it(
    "Should display the 'No repository has been favourite yet!' message instead of a list," +
      " when there is no favourite repository stored on the local storage",
    () => {
      render(
        <LocalStorageMock
          items={{
            [favouriteRepositoriesStorageKey]: "{}",
          }}
        >
          <FavouriteRepositoriesList />
        </LocalStorageMock>
      );

      const favouriteRepositoriesListElement = screen.queryByRole("list");
      const messageElement = screen.getByText(
        /No repository has been favourite yet!/
      );

      expect(favouriteRepositoriesListElement).not.toBeInTheDocument();
      expect(messageElement).toBeInTheDocument();
    }
  );
});

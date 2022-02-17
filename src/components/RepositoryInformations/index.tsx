import * as React from "react";
import classNames from "classnames";
import {
  HeartIcon as HeartIconOutline,
  StarIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { Switch } from "@headlessui/react";

import type { UiRepository } from "../../app/types";

interface FavouriteToggleProps {
  onFavouritedChange(favourited: boolean): void;
}

const FavouriteToggle = ({
  onFavouritedChange,
}: FavouriteToggleProps): JSX.Element => {
  const [favourited, setFavourited] = React.useState<boolean>(false);
  const descriptiveLabel = `${
    favourited ? "Remove from" : "Add to"
  } favourites`;

  const handleChange: React.ComponentProps<typeof Switch>["onChange"] = (
    checked
  ) => {
    setFavourited(checked);
    onFavouritedChange(checked);
  };

  return (
    <Switch
      checked={favourited}
      onChange={handleChange}
      title={descriptiveLabel}
    >
      <span className="sr-only">{descriptiveLabel}</span>
      <span className="inline-block h-6 w-6 text-purple-500">
        {favourited ? <HeartIconSolid /> : <HeartIconOutline />}
      </span>
    </Switch>
  );
};

interface Props extends UiRepository {
  children?: React.ReactNode;
}

const RepositoryInformations = ({
  id,
  name,
  starsCount,
  githubLink,
  description,
  children,
}: Props): JSX.Element => (
  <div
    aria-labelledby={`repoName-${id}`}
    className={classNames(
      { relative: children },
      "p-4 sm:p-6 rounded-lg shadow-md dark:bg-slate-800"
    )}
  >
    <div className="flex flex-wrap items-center">
      <h3
        id={`repoName-${id}`}
        className="w-full text-lg font-semibold dark:text-white"
      >
        <span className="sr-only">Name:</span> {name}
      </h3>

      <div className="text-sm font-medium text-slate-400 truncate max-w-[12rem] sm:max-w-none">
        <h4 className="sr-only">Link to GitHub</h4>
        <a
          title={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          href={githubLink}
        >
          {githubLink.replace("https://", "")}
        </a>
      </div>

      <h4 className="sr-only">Stars</h4>
      <div
        className={classNames([
          "text-xs font-semibold leading-tight text-slate-400",
          "ml-4",
          "flex items-center",
          "relative before:absolute before:-left-2 before:top-0 before:w-px before:h-4 before:bg-current",
        ])}
      >
        <StarIcon className="w-4 h-4" />
        <p className="ml-1">
          <strong>{starsCount}</strong> stars
        </p>
      </div>
    </div>

    <h4 className="sr-only">Description</h4>
    {description && (
      <p className="prose dark:prose-invert mt-6">{description}</p>
    )}

    {children && (
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <h4 className="sr-only">Action</h4>
        {children}
      </div>
    )}
  </div>
);

RepositoryInformations.FavouriteToggle = FavouriteToggle;

export default RepositoryInformations;

import * as React from "react";

import { FetchStatus, UiRepository } from "../../app/types";
import NoRepositoryMessage from "../NoRepositoryMessage";
import type { FavouriteToggleProps } from "../RepositoryInformations";

interface Props {
  repositories: UiRepository[];
  fetchStatus: FetchStatus;
  onFavouriteStatusOfRepositoryChange: FavouriteToggleProps["onFavouriteStatusChange"];
}

const LazyRepositoriesList = React.lazy(() => import("../RepositoriesList"));
const LazyFavouriteToggle = React.lazy(async () => {
  const repositoryInformationsModule = await import(
    "../RepositoryInformations"
  );
  return { default: repositoryInformationsModule.default.FavouriteToggle };
});

const TrendingRepositoriesListView = ({
  repositories,
  fetchStatus,
  onFavouriteStatusOfRepositoryChange,
}: Props): JSX.Element => (
  <React.Suspense
    fallback={<NoRepositoryMessage fetchStatus={FetchStatus.LOADING} />}
  >
    {fetchStatus === FetchStatus.IDLE && repositories.length ? (
      <LazyRepositoriesList repositories={repositories}>
        {(repositoryId) => (
          <React.Suspense fallback={null}>
            <LazyFavouriteToggle
              repositoryId={repositoryId}
              onFavouriteStatusChange={onFavouriteStatusOfRepositoryChange}
            />
          </React.Suspense>
        )}
      </LazyRepositoriesList>
    ) : (
      <NoRepositoryMessage fetchStatus={fetchStatus} />
    )}
  </React.Suspense>
);

export default TrendingRepositoriesListView;

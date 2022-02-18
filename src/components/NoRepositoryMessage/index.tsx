import * as React from "react";
import { FetchStatus } from "../../app/types";

interface Props {
  fetchStatus: FetchStatus;
}

const NoRepositoryMessage = ({ fetchStatus }: Props): JSX.Element => {
  const textToDisplayByFetchStatusWhenNoRepositoryIsRendered: Record<
    FetchStatus,
    string
  > = {
    loading: "Loading...",
    idle: "No repository has been found.",
    failed: "An error has occured!",
  };

  return (
    <p className="flex justify-center mt-6">
      {textToDisplayByFetchStatusWhenNoRepositoryIsRendered[fetchStatus]}
    </p>
  );
};

export default NoRepositoryMessage;

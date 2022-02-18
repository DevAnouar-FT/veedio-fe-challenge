import * as React from "react";

import List from "../../ui/List";
import RepositoryInformations from "../RepositoryInformations";
import type { UiRepository } from "../../app/types";

interface Props {
  repositories: UiRepository[];
  children?: (repositoryId: UiRepository["id"]) => JSX.Element;
}

const RepositoriesList = ({ repositories, children }: Props): JSX.Element => (
  <List>
    {repositories.map<JSX.Element>(
      ({ id, name, starsCount, githubLink, description }) => (
        <List.Item key={id}>
          <RepositoryInformations
            id={id}
            name={name}
            starsCount={starsCount}
            githubLink={githubLink}
            description={description}
          >
            {children?.(id)}
          </RepositoryInformations>
        </List.Item>
      )
    )}
  </List>
);

export default RepositoriesList;

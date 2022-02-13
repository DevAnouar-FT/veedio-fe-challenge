import * as React from "react";
import List from "../../ui/List";
import RepositoryInformations from "../RepositoryInformations";

const TrendingRepositoriesList = (): JSX.Element => (
  <List>
    {[...Array(10)].map((_, index) => (
      <List.Item key={`trendingRepoWrapper-${index}`}>
        <RepositoryInformations
          id={`trendingRepo-${index}`}
          name="react-contextual"
          starsCount={868}
          githubLink="https://github.com/drcmda/react-contextual"
          description="🚀 react-contextual is a small (less than 1KB) helper around React 16s new context api."
        />
      </List.Item>
    ))}
  </List>
);

export default TrendingRepositoriesList;

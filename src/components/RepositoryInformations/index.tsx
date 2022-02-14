import * as React from "react";

interface Props {
  id: string;
  name: string;
  starsCount: number;
  githubLink: string;
  description?: string;
}

const RepositoryInformations = ({
  id,
  name,
  starsCount,
  githubLink,
  description,
}: Props): JSX.Element => (
  <div
    aria-labelledby={`repoName-${id}`}
    className="p-6 rounded-lg shadow-md dark:bg-slate-800"
  >
    <div className="flex flex-wrap">
      <h3
        id={`repoName-${id}`}
        className="flex-auto text-lg font-semibold dark:text-white"
      >
        <span className="sr-only">Name:</span> {name}
      </h3>

      <h4 className="sr-only">Stars</h4>
      <div className="text-lg font-semibold text-slate-400">
        <strong>{starsCount}</strong> stars
      </div>

      <div className="w-full flex-none text-sm font-medium text-slate-400">
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
    </div>

    <h4 className="sr-only">Description</h4>
    {description && (
      <p className="prose dark:prose-invert mt-6">{description}</p>
    )}
  </div>
);

export default RepositoryInformations;

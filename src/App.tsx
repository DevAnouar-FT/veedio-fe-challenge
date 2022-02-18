import * as React from "react";
import classNames from "classnames";
import { Tab } from "@headlessui/react";

import TrendingRepositoriesList from "./components/TrendingRepositoriesList";

import "./assets/css/app.scss";

const FavouriteRepositoriesList = React.lazy(
  () => import("./components/FavouriteRepositoriesList")
);

function App() {
  const tabsTitleContentMap: Record<string, React.ReactNode> = {
    Trending: <TrendingRepositoriesList />,
    Favourites: (
      <React.Suspense
        fallback={<p className="flex justify-center mt-6">Loading ...</p>}
      >
        <FavouriteRepositoriesList />
      </React.Suspense>
    ),
  };

  return (
    <main>
      <Tab.Group>
        <Tab.List className="container">
          {Object.keys(tabsTitleContentMap).map<JSX.Element>(
            (currentTabTitle) => (
              <Tab key={`tab-${currentTabTitle}`}>
                {({ selected }) => (
                  <span
                    className={classNames([
                      "inline-block px-4 py-2 leading-8 text-sm",
                      `border-b-2 ${
                        selected
                          ? "font-semibold border-blue-800"
                          : "border-transparent hover:border-slate-700 hover:transition-colors"
                      }`,
                    ])}
                  >
                    {currentTabTitle}
                  </span>
                )}
              </Tab>
            )
          )}
        </Tab.List>
        <Tab.Panels className="flex border-t border-slate-700">
          {Object.keys(tabsTitleContentMap).map<JSX.Element>(
            (currentTabTitle) => (
              <Tab.Panel
                key={`panel-${currentTabTitle}`}
                className="container mt-8"
              >
                <div
                  className={classNames([
                    "h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)]",
                    "md:max-w-xl lg:max-w-4xl mx-auto",
                    "overflow-y-auto",
                  ])}
                >
                  {tabsTitleContentMap[currentTabTitle]}
                </div>
              </Tab.Panel>
            )
          )}
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
}

export default App;

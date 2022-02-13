import * as React from "react";
import classNames from "classnames";
import TrendingRepositoriesList from "./components/TrendingRepositoriesList";

import "./assets/css/app.scss";

function App() {
  return (
    <main className="container mx-auto mt-8 px-8">
      <div
        className={classNames([
          "h-[calc(100vh-6rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-8rem)]",
          "overflow-y-auto overscroll-none",
        ])}
      >
        <TrendingRepositoriesList />
      </div>
    </main>
  );
}

export default App;

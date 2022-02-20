# Trending GitHub Repositories

![Live Demo (source: imgur.com)](https://i.imgur.com/QhpNzrN.gif)

This is a Web Application that displays a list of fetched trending repositories from GitHub created within the last 7 days, sorted by their stars count in descending order.

## Overview

### Implemented features

- Fetch and display the list of Github trending repositories created within the last 7 days, sorted by stars count in descending order.
- Users should be able to favourite trending repositories.
- Users should be able to remove a repository from being marked as favourite.
- Displays the list of favourite repositories.
- Sync the favourite repositories between multiple document contexts.
- Fully responsive UI.

### Demo

You can visit a deployed version of the production build by following [this link](https://veedio-fe-challenge.vercel.app/).

## Technical Stack

- [TypeScript](https://www.typescriptlang.org/) for Static Type Checking.
- [React v17](https://reactjs.org/) for building User Interfaces.
- [Headless UI](https://headlessui.dev/) for lightweight and accessible UI components.
- [Heroicons](https://heroicons.com/) for SVG icons.
- [Fontsource](https://fontsource.org/) for the _Inter_ Typography font.
- [TailwindCSS](https://tailwindcss.com/) as a CSS framework.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) with [Jest](https://jestjs.io/) for testing React components.
- [Mock Service Worker](https://mswjs.io/) for API mocking.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> You can pass the --watchAll=false flag to run the test suites without the interactive watch mode (eg. `npm test --watchAll=false`).<br><br>
> If you want to print the code coverage report, you can run the test script by passing the --coverage flag (eg. `npm test --coverage`).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Acknowledgments

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and deployed on [Vercel](https://vercel.com/).

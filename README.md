A simple trello clone application with Playwright tests added to them

The original version of this app was built by Filip Hric and [you can find it here](https://github.com/filiphric/trelloapp). I copied the application and added Playwright tests to it


## Setup
Install the dependencies

`npm install`

Start the app

`npm start`

## How to run the tests:

To run all the Playwright tests run `npm run pw:e2e` or `npx playwright test`

To run a specific test run the same script but with path to specific test or folder - for example
 `npm run pw:e2e -- playwright/tests/the-internet-website/newWindow.spec.ts`

## Links to some code examples

Example | Description
--- | ---
[Alerts](./playwright/tests/the-internet-website/alerts.spec.ts) | How to handle alert popups
[New window](./playwright/tests/the-internet-website/newWindow.spec.ts) | How to handle links that open in new window
[Basic auth](./playwright/tests/the-internet-website/basicAuth.spec.ts) | How to handle basic authentication popup
[File download](./playwright/tests/the-internet-website/download.spec.ts) | How to handle downloading a file
[File upload](./playwright/tests/the-internet-website/fileUpload.spec.ts) | How to upload a file
[Drag and drop](./playwright/tests/the-internet-website/dragAndDrop.spec.ts) | How to drag and drop elements
[Hover](./playwright/tests/the-internet-website/hover.spec.ts) | How to hover over an element
[Iframes](./playwright/tests/the-internet-website/iframes.spec.ts) | How to handle iframes
[Hover menu](./playwright/tests/the-internet-website/jqueryMenu.spec.ts) | How to handle menu opens more menus on hover
[Visibility](./playwright/tests/ui-automation-playground/visibility.spec.ts) | Basic explanation of what is considered invisible for Playwright toBeVisible assertion
[Checking response status](./playwright/tests/ui-automation-playground/statusCodes.spec.ts) | How to intercept an API call and check its status
[Accessing environment variables](./playwright/tests/environment.spec.ts) | How to access environment variables
[Modifying styles](./playwright/tests/the-internet-website/modifyStyles.spec.ts) | How to modify CSS of an element
[Accessing clipboard](./playwright/tests/clipboard.spec.ts) | How to access clipboard using external libraries
[API Testing](./playwright/tests/apiTesting.spec.ts) | How to write simple API tests 

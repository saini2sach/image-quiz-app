
## Image-Quiz-App (A React based application)

### Description

* This application provides an interface of a Quiz-App. In this, user is shown some random images and four multiple answers, user have to select correct answer (It directly show whether the answer is correct or wrong(red/green color-code))and proceed with continue button. 

* Also during whole process, there is a timer running, after that time lapse, all response has been recorded and according to user performance, its Result has been shown on final screen.

* For winning the Quiz, user have to fulfill two conditions, as below:

 - Total question attempted should be greater Total-Timer / Time-For-Attempting-One-Question.
 - The accuracy should be greater than 80%.

## Folder Structure

```
image-quiz-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    ImageQuiz.css
    ImageQuiz.js
    ImageQuiz.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

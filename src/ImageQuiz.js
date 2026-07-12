import React, { Component } from 'react';

import './css/ImageQuiz.css';
import './css/bootstrap-min.css';

import MainContent from './components/MainContent';
import Hero from './components/Hero';
import Continue from './components/Continue';
import StartScreen from './components/StartScreen';
import DisplayResult from './components/DisplayResult';
import PlayAgain from './components/PlayAgain';

const getDataApi = (_self) =>{
  // Fisher-Yates shuffle so the 4 options are always distinct
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Local mock data lives in public/quizData.json.
  // process.env.PUBLIC_URL keeps this working both in dev ("/")
  // and on GitHub Pages ("/image-quiz-app").
  fetch(process.env.PUBLIC_URL + '/quizData.json')
    .then( (response) => response.json())
    .then((data) => {
      const itemLists = data.list.map( (item) => item.name);

      // pick 4 distinct options, then choose one of them as the answer
      const listOfItem = shuffle(itemLists).slice(0, 4);
      const selectedPhotoName = listOfItem[Math.floor(Math.random() * listOfItem.length)];

      // The name drives the image (keyword-based, like the old randomlists URL).
      // LoremFlickr returns a photo matching the keyword; the timestamp avoids
      // the browser caching the same photo across puzzles.
      const keyword = selectedPhotoName.replace(/_/g, ',');
      const randomUrl = 'https://loremflickr.com/500/500/' + keyword + '?random=' + Date.now();

      _self.setState({
        imageUrl: randomUrl,
        correctAnswer: selectedPhotoName,
        setOfAnswer: listOfItem,
        showContinueBtn: false,
        imageLoaded: false
      })
  })
}

class ImageQuiz extends Component {
  constructor(props) {
    super(props);
    this.autoAdvanceTimer = null;
    this.autoAdvanceMs = 1500;
    this.enableContinueBtn = this.enableContinueBtn.bind(this);
    this.newPuzzle = this.newPuzzle.bind(this);
    this.showResult = this.showResult.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
  }

  static initialState = () => ({
    imageUrl: '',
    correctAnswer: '',
    setOfAnswer: [],
    savedResult: [],
    showContinueBtn: false,
    timerLimit: 60,
    isTimerReached: false,
    oneQuesAttemptTime: 5,
    imageLoaded: false,
    gameStarted: false
  })

  state = ImageQuiz.initialState();

  showResult = () => {
    // Game timer ran out — cancel any pending auto-advance so we don't
    // load a new puzzle after the result screen is shown.
    clearTimeout(this.autoAdvanceTimer);
    this.setState({
      isTimerReached: true,
      showContinueBtn: false
    })
  }

  startGame = (selectedTime) => {
    var _self = this;
    // Lock in the chosen duration and load the first puzzle.
    this.setState({ gameStarted: true, timerLimit: selectedTime });
    getDataApi(_self);
  }

  resetQuiz = () => {
    // Back to the landing screen so the player can re-pick a time.
    this.setState(ImageQuiz.initialState());
  }

  newPuzzle = () => {
    // Clear a pending auto-advance so an early "Continue" click and the
    // 1s timer can never both fire and skip a puzzle.
    clearTimeout(this.autoAdvanceTimer);
    var _self = this;
    const allOptionsObj = document.querySelectorAll('.item-options .option');
    for(var obj of allOptionsObj) {
      obj.classList.remove('red', 'green');
    }
    this.setState({
      imageUrl: '',
      imageLoaded: false
    })
    getDataApi(_self);
  }

  handleImageLoad = () => {
    // Image finished loading (or errored) — unfreeze the timer.
    this.setState({ imageLoaded: true });
  }

  endQuiz = () => {
    // Confirm before ending so an accidental click can't lose progress.
    if (window.confirm('End the quiz and see your results?')) {
      this.showResult();
    }
  }

  enableContinueBtn = (isAnswerCorrect) => {
    this.setState( (prevState) => ({
      showContinueBtn: true,
      savedResult: prevState.savedResult.concat(isAnswerCorrect)
    }))
    // Auto-advance to the next puzzle 1s after an answer is attempted.
    // The user can still press Continue to skip ahead sooner — newPuzzle
    // clears this timer so the two paths never double-advance.
    this.autoAdvanceTimer = setTimeout(this.newPuzzle, this.autoAdvanceMs);
  }

  componentWillUnmount() {
    clearTimeout(this.autoAdvanceTimer);
  }

  render() {
    let {imageUrl, correctAnswer, setOfAnswer, showContinueBtn, timerLimit, savedResult, oneQuesAttemptTime, imageLoaded, gameStarted} = this.state;
    return (
      <div className="container-fluid">
        <Hero />
        { !gameStarted
          ? <StartScreen onStart={this.startGame} />
          : !this.state.isTimerReached
            ? <MainContent
                imageUrl={imageUrl}
                correctAnswer= {correctAnswer}
                setOfAnswer={setOfAnswer}
                showContinueBtn={showContinueBtn}
                enableContinueBtn={this.enableContinueBtn}
                timerLimit={timerLimit}
                showResult={this.showResult}
                imageLoaded={imageLoaded}
                onImageLoad={this.handleImageLoad}
              />
            : <div>
                <DisplayResult
                  resultList={savedResult}
                  timerLimit={timerLimit}
                  oneQuesAttemptTime={oneQuesAttemptTime}
                />
                <PlayAgain resetQuiz={this.resetQuiz}/>
              </div>
        }
        { gameStarted && showContinueBtn && <Continue newPuzzle={this.newPuzzle} autoAdvanceMs={this.autoAdvanceMs}/>}
        { gameStarted && !this.state.isTimerReached &&
          <div className="end-quiz-wrapper">
            <button className="end-quiz-btn" onClick={this.endQuiz}>End Quiz</button>
          </div>
        }
      </div>
    )
  }
}

export default ImageQuiz;

import React, { Component } from 'react';

import './css/ImageQuiz.css';
import './css/bootstrap-min.css';

import MainContent from './components/MainContent';
import Hero from './components/Hero';
import Continue from './components/Continue';
import Footer from './components/Footer';
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
    this.autoAdvanceMs = 1000;
    this.enableContinueBtn = this.enableContinueBtn.bind(this);
    this.newPuzzle = this.newPuzzle.bind(this);
    this.showResult = this.showResult.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
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
    imageLoaded: false
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

  resetQuiz = () => {
    var _self = this;
    this.setState(ImageQuiz.initialState());
    getDataApi(_self);
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

  componentDidMount() {
    var _self = this;
    getDataApi(_self);
  }

  componentWillUnmount() {
    clearTimeout(this.autoAdvanceTimer);
  }

  render() {
    let {imageUrl, correctAnswer, setOfAnswer, showContinueBtn, timerLimit, savedResult, oneQuesAttemptTime, imageLoaded} = this.state;
    return (
      <div className="container-fluid">
        <Hero />
        { !this.state.isTimerReached
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
        { showContinueBtn && <Continue newPuzzle={this.newPuzzle} autoAdvanceMs={this.autoAdvanceMs}/>}
        <Footer />
      </div>
    )
  }
}

export default ImageQuiz;

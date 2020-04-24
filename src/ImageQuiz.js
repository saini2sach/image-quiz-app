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
  const getRandomItem = (arr) => {
    let item = arr[Math.floor(Math.random() * arr.length)];

    if(item.indexOf(' ') >= 0) {
      item = item.replace(/ /g,"_");
    }
    return item;
  };

  fetch('https://demo6817798.mockable.io/getImageQuizAppData')
    .then( (response) => response.json())
    .then((data) => {
      let listOfItem = [],
          itemLists = [],
          imageObj = {
            prefix: 'img/things/',
            suffix: '.jpg'
          };
      
      itemLists = data.list.map( (item) => item.name);

      for(let i=0; i < 4; i++) {
        let randomItem = getRandomItem(itemLists);
        listOfItem.push(randomItem);
      }

      const selectedPhotoName = getRandomItem(listOfItem);
      const randomUrl = 'https://www.randomlists.com/'+ imageObj.prefix +''+ selectedPhotoName +''+imageObj.suffix;

      _self.setState({
        imageUrl: randomUrl,
        correctAnswer: selectedPhotoName,
        setOfAnswer: listOfItem,
        showContinueBtn: false
      })
  })
}

class ImageQuiz extends Component {
  constructor(props) {
    super(props);
    this.enableContinueBtn = this.enableContinueBtn.bind(this);
    this.newPuzzle = this.newPuzzle.bind(this);
    this.showResult = this.showResult.bind(this);
  }

  static initialState = () => ({
    imageUrl: '',
    correctAnswer: '',
    setOfAnswer: [],
    savedResult: [],
    showContinueBtn: false,
    timerLimit: 35,
    isTimerReached: false,
    oneQuesAttemptTime: 5
  })

  state = ImageQuiz.initialState();

  showResult = () => {
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
    var _self = this;
    const allOptionsObj = document.querySelectorAll('.item-options .option');
    for(var obj of allOptionsObj) {
      obj.classList.remove('red', 'green');
    }
    this.setState({
      imageUrl: ''
    })
    getDataApi(_self);
  }

  enableContinueBtn = (isAnswerCorrect) => {
    this.setState( (prevState) => ({
      showContinueBtn: true,
      savedResult: prevState.savedResult.concat(isAnswerCorrect)
    }))
  }

  componentDidMount() {
    var _self = this;
    getDataApi(_self);
  }

  render() {
    let {imageUrl, correctAnswer, setOfAnswer, showContinueBtn, timerLimit, savedResult, oneQuesAttemptTime} = this.state;
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
        { showContinueBtn && <Continue newPuzzle={this.newPuzzle}/>}
        <Footer />
      </div>
    )
  }
}

export default ImageQuiz;

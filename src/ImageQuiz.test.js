import React from 'react';
import ReactDOM from 'react-dom';
import ImageQuiz from './ImageQuiz';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImageQuiz />, div);
  ReactDOM.unmountComponentAtNode(div);
});

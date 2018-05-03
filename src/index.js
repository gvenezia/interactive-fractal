// create-react-app boilerplate
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// from React Armory tutorial
import { getBoxStyle } from './PythagorasTree.js'

const TreeBox = (props) => {
  const style = getBoxStyle(props);
  const baseProps = Object.assign({}, props, {level: props.level + 1});
  
  const leftChild = 
    props.level < props.totalLevels &&
    React.createElement(TreeBox, 
      Object.assign({}, baseProps, {right: false})
    );

  const rightChild =
    props.level < props.totalLevels &&
    React.createElement(TreeBox, 
      Object.assign({}, baseProps, {right: true})
    );

  return React.createElement('div', { style },
    leftChild,
    rightChild
  )
}

ReactDOM.render(
  React.createElement(TreeBox, { 
    level: 0,
    totalLevels: 7,
    heightFactor: 0.27,
    lean: -0.20, 
    size: 200,
  }),
  document.getElementById('root')
)
    
registerServiceWorker();

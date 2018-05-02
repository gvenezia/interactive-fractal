// create-react-app boilerplate
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// from React Armory tutorial
import { getBoxStyle } from './PythagorasTree.js'

// Don't set `totalLevels` above 8 -- your browser will
// freeze due to the amount of work required.
let totalLevels = 2
let heightFactor = 0.37
let lean = -0.10
let size = 100

const TreeBox = (props) => {
  const style = getBoxStyle({
    level: props.level,
    right: props.right,
    left: props.left,
    heightFactor,
    lean,
    size,
    totalLevels,
  })
  
  const leftChild = 
    props.level < totalLevels &&
    React.createElement(TreeBox, {
        left: true,
        level: props.level + 1,
    });

  const rightChild =
    props.level < totalLevels &&
    React.createElement(TreeBox, {
        right: true,
        level: props.level + 1,
    });

  return React.createElement('div', { style },
    leftChild,
    rightChild
  )
}

ReactDOM.render(
  React.createElement(TreeBox, { level: 0 }),
  document.getElementById('root')
)
    
registerServiceWorker();

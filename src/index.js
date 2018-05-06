// create-react-app boilerplate
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Import pre-set components from React Armory tutorial
import { getBoxStyle } from './PythagorasTree.js';
import { Timer } from './Timer.js';

class AnimatedTree extends React.component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    
    this.state = {
      time: 0,
      active: 0
    }
    
    this.timer = new Timer (() => {
      const {time, active} = this.timer;
      this.setState({time, active});
    });
  };
  
  toggle() {
    if (this.state.active){
      this.timer.stop();
      this.setState({active: false});
    } else {
      this.timer.start();
      this.setState({active:true});
    }
    
    
  }
  
  render() {
    return React.createElement();
  }
}

ReactDOM.render(
  React.createElement(AnimatedTree, {sway: 0.01, sprout: 0.05}),
  document.getElementById('root')
);

// ==================================
// Old static tree
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

setInterval(() => {
  time += 1;
  
  ReactDOM.render(
    React.createElement(TreeBox, { 
      level: 0,
      totalLevels: 8,
      heightFactor: 0.77,
      lean: 0.2*Math.sin(time / 50), 
      size: 100,
    }),
    document.getElementById('root')
  );
  
}, 50);
  
    
registerServiceWorker();

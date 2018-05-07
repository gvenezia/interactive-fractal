// =============================================================
// create-react-app boilerplate
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Import pre-set components from React Armory tutorial
import { getBoxStyle } from './PythagorasTree.js';
import { Timer } from './Timer.js';

// React Components
// =============================================================
class AnimatedTree extends React.Component {
  constructor(props) {
    super(props);
    
    // Bind toggle
    this.toggle = this.toggle.bind(this);
    
    // State
    this.state = {
      time: 0,
      active: false
    };
    
    // Add Timer component
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
    const buttonText = this.state.active ? 'Stop Animation' : 'Start Animation';
    
    return React.createElement('div', {},
      React.createElement(TreeBox, {
        level: 0,
        totalLevels: 8,
        size: 200,
        heightFactor: 0.3 + 0.1*Math.sin(this.state.time)*this.props.sprout + 0.3,
        lean: 10.0*Math.sin(this.state.time/5)*this.props.sway 
      }),
      React.createElement('button', {onClick: this.toggle}, buttonText)
    );
  } // end render
} // End AnimatedTree

const TreeBox = (props) => {
  const style = getBoxStyle(props);
  const baseProps = Object.assign({}, props, {level: props.level + 1});
  
  const leftChild = 
    props.level < props.totalLevels &&
    React.createElement(TreeBox, Object.assign({}, baseProps, {right: false}) );

  const rightChild =
    props.level < props.totalLevels &&
    React.createElement(TreeBox, Object.assign({}, baseProps, {right: true}) );

  return React.createElement('div', { style },
    leftChild,
    rightChild
  )
} // End TreeBox

// DOM Render
// ===============================================================
ReactDOM.render(
  React.createElement(AnimatedTree, {sway: 0.1, sprout: 0.5}),
  document.getElementById('root')
);
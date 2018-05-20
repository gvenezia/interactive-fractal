// =============================================================
// create-react-app boilerplate
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Import pre-set components from React Armory tutorial
import { getBoxStyle } from './PythagorasTree.js';
import { NumericInput } from './PythagorasTree.js';
import { Timer } from './Timer.js';

// React Components
// =============================================================
class AnimatedTree extends React.Component {
  constructor(props) {
    super(props);
    
    // Bind toggle and setSway
    this.toggle = this.toggle.bind(this);
    this.setSway= this.setSway.bind(this);
    
    // State
    this.state = {
      time: 0,
      active: false,
      sway: .001
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
  
  setSway(value){
    this.setState({sway: value});
    }
  
  render() {
    const buttonText = this.state.active ? 'Stop Animation' : 'Start Animation';
    const treeProps = {
        level: 0,
        totalLevels: 5,
        size: 100,
        heightFactor: 0.3 + 0.1*Math.sin(this.state.time)*this.props.sprout + 0.3,
        lean: 10.0*Math.sin(this.state.time/5)*this.state.sway 
      };
  
    return (
      <div>
        <TreeBox {...treeProps} />
        <button onClick={this.toggle} >
          {buttonText}
        </button>
        <NumericInput 
          value={this.state.sway}
          onChange={this.setSway}
        />
      </div>
    ); // end return
  }; // end render
} // End AnimatedTree

const TreeBox = (props) => {
  const style = getBoxStyle(props);
  const baseProps = Object.assign({}, props, {level: props.level + 1});
  
  const leftChild = 
    props.level < props.totalLevels &&
    <TreeBox {...baseProps} right={false} /> // Uses JSX spread attribute, 'right=' overrides the 'right:' in baseProps

  const rightChild =
    props.level < props.totalLevels &&
    <TreeBox {...baseProps} right={true} /> 

  return (
  <div style={ style }>
    {leftChild}
    {rightChild}
  </div>
  );
} // End TreeBox

// DOM Render
// ===============================================================
ReactDOM.render(
  <AnimatedTree sprout={0.5} />,
  document.getElementById('root')
);
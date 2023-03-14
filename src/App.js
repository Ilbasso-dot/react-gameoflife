import React from 'react';
import { useState, useEffect } from 'react';
import { generateBoard, nextIt } from './generate_board';
import './App.css';

class Cell extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.value !== this.props.value
    );
  }

  render() {
    return this.props.value === 1 ? <div className='cell-alive'></div> : <div className='cell-dead'></div>
  }
}

class Board extends React.Component {
  render() {
    return (
      <div>
        {this.props.value.map((value, index) => {
          return (<div className='board-row'>
            {
              value.map((value2, index) => {
                return <Cell value={value2} />
              })
            }
          </div>);
        })}
      </div>
    );
  }
}

function App() {

  const [board, setBoard] = useState(() => generateBoard(80, 130));
  const [speed, setSpeed] = useState(500);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter => counter + 1);
      setBoard(board => nextIt(board))
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div>
      <Board value={board} />
      <form>
        <label>
          Speed:
          <input type="text" name="speed" value={speed} defaultValue="1000" onChange={(e) => setSpeed(e.target.value)} />
        </label>
      </form>
      <div>Counter interaction: {counter}</div>
    </div >
  );
}

export default App;

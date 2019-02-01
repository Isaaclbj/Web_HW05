import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Memory />, root);
}
function ran() {
  return _.shuffle(["a","a","b","b","c","c","d","d",
  "e","e","f","f","g","g","h","h"]);
}

class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: ran(),
      trying: [],
      done: []};
  }

  restart() {
    this.setState({
      letters: ran(), trying: [], done: []
    })
  }



  render() {
    const {letters,trying, done} = this.state;
    return (
      <div>
      <a href="http://ezthrowaway.host"> To home page</a>
      <div className="restartButton">
      <button onClick={this.restart.bind(this)}> start! </button>
      </div>
          <div className="column">
            {letters.slice(0,4).map((letter,index) =>
                <Letter
                letter = {letter}
                onClick = {this.flip.bind(this,index)}
                try = {trying.includes(index).toString()}
                don = {done.includes(index).toString()}
                key = {index}/>
              )}
          </div>
          <div className="column">
            {letters.slice(4,8).map((letter,index) =>

                <Letter
                letter = {letter}
                onClick = {this.flip.bind(this,index+4)}
                try = {trying.includes(index +4).toString()}
                don = {done.includes(index +4).toString()}
                key = {index+4}/>
              )}
          </div>
          <div className="column">
            {letters.slice(8,12).map((letter,index) =>

                <Letter
                letter = {letter}
                onClick = {this.flip.bind(this,index+8)}
                try = {trying.includes(index+8).toString()}
                don = {done.includes(index+8).toString()}
                key = {index+8}/>
              )}
          </div>
          <div className="column">
            {letters.slice(12,16).map((letter,index) =>

                <Letter
                letter = {letter}
                onClick = {this.flip.bind(this, index+12)}
                try = {trying.includes(index+12).toString()}
                don = {done.includes(index+12).toString()}
                key = {index+12}/>
              )}
          </div>
        </div>
    );
  }

  flip(index) {
    const {letters, trying ,done} = this.state;
    console.log(index);
    console.log(letters[index]);
    if(trying == 0) {
      this.setState({trying: trying.concat(index)});
    }
    else {
      console.log("is being compared to");
      console.log(trying[0]);
      console.log(letters[trying[0]]);
      if (letters[index] == letters[trying[0]]) {
        this.setState({
          trying:[], done:done.concat(trying[0], index)});
        }
      else {
        this.setState({trying:[trying[0], index]});
        setTimeout(() => {
          this.setState({trying: []})
        }, 500);
      }
      }
    }
  }

let Letter = (props) => {
  if(props.don == "true") {
        return <button type="button" disabled> {props.letter} </button>
  }
  else if(props.try == "true") {
    return <button type="button" className="trying"> {props.letter} </button>
  }
  else if(props.don == "false" && props.try == "false") {
    return <button type="button" className="hidden" onClick={() => props.onClick()}>  </button>
  }

}
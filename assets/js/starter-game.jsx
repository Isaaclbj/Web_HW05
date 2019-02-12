import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

//starter code copied from lecture note "hangman" by Professor Nat Tuck

export default function game_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}


class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.pause = false;
    this.state = {
      letters: [],
      trying: [],
      done: []
     };
    this.channel
        .join()
        .receive("ok", this.got_view.bind(this))
        .receive("error", resp => {console.log("Unable to join", resp);} );
  }


  got_view(view) {
      console.log("new view", view);
      this.setState(view.game)
      if (view.game.trying.length > 1) {
          this.pause = true;
          this.timeout();
      }
  }

  timeout() {
      setTimeout(()=>{this.channel.push("match", {})
          .receive("ok",this.got_view.bind(this));
          this.pause = false;},1000)
  }


  restart() {
    this.channel.push("restart")
        .receive("ok", this.get_view.bind(this));
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
                trying = {trying.includes(index).toString()}
                key = {index}/>
              )}
          </div>
          <div className="column">
            {letters.slice(4,8).map((letter,index) =>
                <Letter
                letter = {letter}
                trying = {trying.includes(index + 4).toString()}
                key = {index+4}/>
              )}
          </div>
          <div className="column">
            {letters.slice(8,12).map((letter,index) =>

                <Letter
                letter = {letter}
                trying = {trying.includes(index+8).toString()}
                onClick = {this.flip.bind(this,index+8)}
                key = {index+8}/>
              )}
          </div>
          <div className="column">
            {letters.slice(12,16).map((letter,index) =>

                <Letter
                letter = {letter}
                trying = {trying.includes(index+12).toString()}
                onClick = {this.flip.bind(this, index+12)}
                key = {index+12}/>
              )}
          </div>
        </div>
    );
  }

  flip(index) {
      if (!this.pause) {
          this.channel.push("guess", index).
          receive("ok", this.got_view.bind(this));
      }
    }
  }

let Letter = (props) => {
  if(props.letter == " - ") {
      return <button type="button" className="hidden" onClick={() => props.onClick()}> - </button>
  }
  else if(props.try == "true") {
    return <button type="button" className="trying"> {props.letter} </button>
  }
  else {
      return <button type="button" disabled> {props.letter} </button>
  }
}
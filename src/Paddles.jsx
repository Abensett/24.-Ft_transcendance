import React from 'react'; 

// ComponentDidMount and ComponentWillUnmount are used to add and remove event listeners
// keydown is used to detect when a key is pressed
// handleKeyPress is used to update the state of the paddle position

export class PaddleMove extends React.Component {

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.key === 'ArrowUp' && this.props.Paddle1 > 0) {
      if (this.props.Paddle1 )
        this.props.ChangePaddleHeight(this.props.Paddle1 - 1);
    }
    if (event.key === 'ArrowDown' && this.props.Paddle1 < 90) {
      this.props.ChangePaddleHeight(this.props.Paddle1 + 1);
    }
  };

  render() {
    return(
    <div
    className="Paddle Paddle1"
    style={{
      top: `${this.props.Paddle1}%`
    }}
    />);
  }
}

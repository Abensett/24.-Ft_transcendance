import React from 'react';


// useState = valeur de l'état
// useEffect = lifecycle management
// useRef = reference to a DOM element (DOM element is a HTML element D = Document O = Object M = Model)
import { useState, useEffect, useRef } from "react";

export class BallMove extends React.Component {


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
    className="Ball"
    style={{
      left: `${this.props.x}px`,
      top: `${this.props.y}px`
    }}
    />);
  }
}

// offsetWidth and offsetHeight are the width and height of the element including padding and border
// useRef is used to get the reference of the parent element (Board) and then we can get the width and height of the parent element
// useEffect is used to update the state of the ball position
// setInterval is used to update the state of the ball position every 10 ms
export const Ball = (props) => {
    const [Position, setPosition] = useState({ x: 50, y: 50 });
    const [Speed, setSpeed] = useState({ x: 5, y: 5 });
    const [angle, setAngle] = useState(45);
    const parentRef = useRef(null);

    useEffect(() => {
      const parent = parentRef.current;
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;

      const intervalId = setInterval(() => {
        setPosition(prevPos => {
          let newX = prevPos.x + Speed.x * Math.cos((angle * Math.PI) / 180);
          let newY = prevPos.y + Speed.y * Math.sin((angle * Math.PI) / 180);

          if (newX < 0 + 20 || newX + 20 > width) {
            newX = prevPos.x - Speed.x;
            Speed.x = - Speed.x;
            setAngle(180 - angle);
          }
          if (newY < 0 || newY + 20 > height) {
            newY = prevPos.y;
            Speed.y = - Speed.y;
            setAngle(380 - 2 * angle);
          }
          return { x: newX, y: newY };
        });
      }, 13);
      return () => clearInterval(intervalId);
    }, []);

    return (
      <div
        ref={parentRef}
        className="Board"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <div
          className="Ball"
          style={{
            left: `${Position.x}px`,
            top: `${Position.y}px`
          }}
        />
      </div>
    );
  };

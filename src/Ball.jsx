import React from 'react';


 

/******************************************
 *        Responsive  + Bounce            *
 ******************************************/
// Pass ref component to child component
// with ref we can get the width and height of the parent component 
// - current ->  property of a ref object that refers to the current mounted instance of a component or DOM node
// - offsetWidth and offsetHeight to get the width and height 


/******************************************
 *             Check Bounce               *
 ******************************************/
// BOARD Check :  Position X < BoardWidth and Position Y < BoardHeight

// Paddle Check : BoardHeigh / 10 * PaddleHeight / 10 = BORDER1
//              we check  BORDER 1 < BallY < BORDER2 = BORDER1 + BoardHeight / 10





export class BallMove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Width: 0,
      Height: 0,

      intervalId: null,
      isPaused: false,
    };
    this.UpdateDimensions = this.UpdateDimensions.bind(this);
  }

  UpdateDimensions() {
    let ParentComponent = this.props.BoardRef.current;
    const Width = ParentComponent.offsetWidth;
    const Height = ParentComponent.offsetHeight;

    this.setState({ Width, Height });
  }

  componentDidMount() {
    let ParentComponent = this.props.BoardRef.current;
    const Width = ParentComponent.offsetWidth;
    const Height = ParentComponent.offsetHeight;

    this.setState({ Width, Height });
    window.addEventListener("resize", this.UpdateDimensions);


    const intervalId = setInterval(() =>  {
    if (!this.state.isPaused){
      let newX = this.props.BallX + this.props.BallSpeed * Math.cos((this.props.Angle * Math.PI) / 180);
      let newY = this.props.BallY + this.props.BallSpeed * Math.sin((this.props.Angle * Math.PI) / 180);
      let NewAngle = this.props.Angle;
      let NewBallSpeed = this.props.BallSpeed;

      let Boarder1 = this.state.Height / 10 * (this.props.Paddle1Height / 10);
      let Boarder2 = Boarder1 + this.state.Height / 10;
      let Boarder3 = this.state.Height / 10 * (this.props.Paddle2Height / 10);
      let Boarder4 = Boarder3 + this.state.Height / 10;

      function CheckPaddle1() {
      if ((Boarder1 <= newY) && (newY <= Boarder2) && (( newX < 25)))
        return true;
      else
        return false;
      }
      function CheckPaddle2(Width) {
      if ((Boarder3 <= newY) && (newY <= Boarder4) &&  (newX + 20 >  Width - 25))
        return true;
      else
        return false;
      }

      // function CheckPaddle1Edges() {
      //   if ((Boarder1 + 10 >= newY) || (newY >= Boarder2 - 10) )
      //     return true;
      //   else
      //     return false;
      //   }

      if ( CheckPaddle1() || CheckPaddle2(this.state.Width) ) {
        newX = this.props.BallX;
        // if (CheckPaddle1Edges())
        //   NewAngle = 270 - this.props.Angle;
        // else
          NewAngle = (180 - this.props.Angle);
      }

      if ( newX < 0 || newX + 20 > this.state.Width) {
        if (newX > 20)
          this.props.Score(1);
        else
          this.props.Score(2);
        newX = Width / 2;
        newY = Width / 2;
      }
      if ((newY < 0 || newY + 20 > this.state.Height) ) {

        newY = this.props.BallY;
        // NewBallSpeedX = - this.props.BallSpeedX;
        NewAngle = (360 - this.props.Angle);
      }

      this.props.UpdateBall(newX, newY, NewBallSpeed, NewAngle)
    }
    }, 13);

    this.setState({ intervalId });

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }


  handleKeyDown = (event) => {
    if (event.code === 'Space') {
      // pause or resume the ball movement
      this.setState((prevState) => ({ isPaused: !prevState.isPaused }));
    }
  };

  render() {
    return (
      <div
        ref={this.props.BoardRef}
        className="Board"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <div
          className="Ball"
          style={{
            left: `${this.props.BallX}px`,
            top: `${this.props.BallY}px`
          }}
        />
      </div>
    );
  }
}

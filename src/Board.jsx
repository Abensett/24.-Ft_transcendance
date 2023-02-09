import React from 'react';

import {Ball, BallMove} from './Ball.jsx';
import {PaddleMove} from './Paddles.jsx'
import {Score} from './Score.jsx'

// rerennder the board component when the state changes
export class   Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            BallX: 50,
            BallY: 50,
            BallSpeedX: 15,
            BallSpeedY: 5,
            Angle:45,
            Paddle1Height: 50,
            Paddle2Height: 0,
            Player1Score: 0,
            Player2Score: 0,
            Time: 0,
        };
        this.Paddle1Height = this.UpdatePaddle1Height.bind(this);
        this.UpdatePaddle1Height = this.UpdatePaddle1Height.bind(this);
    }
    Ref = React.createRef();

    UpdatePaddle1Height = (NewHeight) => {
        this.setState({Paddle1Height: NewHeight})
    };

    UpdateBall = (NewBallX, NewBallY, NewBallSpeedX, NewBallSpeedY ) => {
        this.setState(
            {
            BallX: NewBallX,
            BallY: NewBallY,
            BallSpeedX : NewBallSpeedX,
            BallSpeedY: NewBallSpeedY
        })
    };

    // on mouse move update the state
    render() {
        return(
            <div className="FullScreen">
                <div className="Board">
                    <Score position="left" player="1" total={this.state.player1Score} />
                    <Score position="right" player="2" total={this.state.player2Score} />
                    < Ball x={this.state.BallX} y={this.state.BallY} Sx={this.state.BallSpeedX} Sy={this.state.BallSpeedY} Angle={this.state.Angle} BoardRef={this.Ref}/>
                    < BallMove />
                    < PaddleMove Paddle1={this.state.Paddle1Height} ChangePaddleHeight={this.UpdatePaddle1Height} BoardRef={this.Ref}/>
                    <div className="Paddle Paddle2"></div>
                </div>
                {/* <h1> {this.state.Paddle1Height} test</h1> */}

                <div className="Social"></div>
            </div>

        )
    }
}

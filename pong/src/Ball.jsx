import React from 'react';

// PUBMED
// https://pubmed.ncbi.nlm.nih.gov/29466611/
//		https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6031472/
//		https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8835651/ -> Parle de melatonin and uvs

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
		if (!this.state.isPaused && !this.props.End){
			let newX = this.props.BallX + this.props.BallSpeed * Math.cos((this.props.Angle * Math.PI) / 180);
			let newY = this.props.BallY + this.props.BallSpeed * Math.sin((this.props.Angle * Math.PI) / 180);
			let NewAngle = this.props.Angle;
			let NewBallSpeed = this.props.BallSpeed;

			let Boarder1 = this.state.Height / 10 * (this.props.Paddle1Height / 10 );
			let Boarder2 = Boarder1 + this.state.Height / 10;
			let Boarder3 = this.state.Height / 10 * (this.props.Paddle2Height / 10);
			let Boarder4 = Boarder3 + this.state.Height / 10;
			let Paddleheight = this.state.Height / 10;

			function CheckPaddle1() {

			if ((Boarder1 <= newY) && (newY <= Boarder2) && (( 15 < newX ) && ( newX < 25)))
				return true;
			else
				return false;
			}

			function CheckPaddle2(Width) {

			if ((Boarder3 <= newY) && (newY <= Boarder4) &&  (( newX + 20 > Width - 20) && (newX + 20> Width - 25)))
				return true;
			else
				return false;
			}
			// 20 % of the center of the paddle launches the ball straight forward
			// 10 % of each edges of the paddle sends the ball with the same angle

			function CheckPaddle1Middle() {
				console.log("Border1:", Boarder1)
				console.log("Border2:",Boarder2)

				if ((Boarder1 + Paddleheight /2 - Paddleheight / 10   <= newY) && (newY <= Boarder1 +  Paddleheight / 2 + Paddleheight / 10   ))
				{
					console.log("middle true")
					return  1;
				}
				else if ((Boarder1 + Paddleheight *  (1/10) >= newY) || (newY >= Boarder1 + Paddleheight *  (9/10) ))
				{
					console.log("angle true ",Boarder1 + Paddleheight *  (1/10),":", Boarder1 + Paddleheight *  (9/10))
					return 2;
				}
				else
					return 0;
				}

				function CheckPaddle2Middle() {
				 console.log("check paddle 2", Boarder3 + Paddleheight / 2 - 5, ":", Boarder3 + Paddleheight / 2 + 5)

				if ((Boarder3 + Paddleheight / 2 - Paddleheight / 10 <= newY) && (newY <= Boarder3 + Paddleheight / 2 + Paddleheight / 10 ))
					return true;
				else if ((Boarder3 + Paddleheight *  (1/10) >= newY) || (newY >= Boarder3 + Paddleheight *  (9/10) ))
				{
					console.log("angle true ",Boarder1 + Paddleheight *  (1/10),":", Boarder1 + Paddleheight *  (9/10))
					return 2;
				}
				else
					return false;
				}


			if ( CheckPaddle1() || CheckPaddle2(this.state.Width) ) {
					newX = this.props.BallX;
				 if (CheckPaddle1Middle()  && newX < 50 )
				 {
					if (CheckPaddle1Middle() == 1)
						NewAngle = 0
					else if (CheckPaddle1Middle() == 2)
						NewAngle = NewAngle - 180
				 }
				 else if (CheckPaddle2Middle() && newX > this.state.Width - 50)
				 {
					if (CheckPaddle2Middle() == 1)
					NewAngle = 180
				else
					NewAngle = 180 + NewAngle
				 }
				 else
						NewAngle = (180 - this.props.Angle);
			}

			if ( newX < 0 || newX + 20 > this.state.Width) {
				if (newX > 20)
					this.props.Score(1);
				else
					this.props.Score(2);
				newX = Width / 2;
				newY = Height / 2;
				if (this.props.Player1Score >= 14 || this.props.Player2Score >= 14)
						this.props.GameEnd();

			}
			if ((newY < 0 || newY + 20 > this.state.Height) ) {

				newY = this.props.BallY;
				NewAngle = (360 - this.props.Angle);
			}

			this.props.UpdateBall(newX, newY, NewBallSpeed, NewAngle)
		}
		}, 13);

		this.setState({ intervalId });

		window.addEventListener('keydown', this.handleKeyDown);
	}

// when component unmount cancels the interval to avoid memory leak
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

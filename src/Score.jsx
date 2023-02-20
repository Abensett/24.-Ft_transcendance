import React from 'react'; 


export class Score extends React.Component {

     render() {
        return (
           <div className={this.props.position}>
              <h2>Player {this.props.player}</h2>
              <h1>{this.props.total}</h1>
           </div>
        );
     }
    }
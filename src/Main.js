import React, { Component } from 'react'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const EMPTY = 'EMPTY';
        const CIRCLE = 'CIRCLE';
        const CROSS = 'CROSS';

        function TicTacToe() {
        const [state, setState] = React.useState({
            player: CROSS,
            positions: [
            EMPTY,EMPTY,EMPTY,
            EMPTY,EMPTY,EMPTY,
            EMPTY,EMPTY,EMPTY
            ]
        })  
        
        function takeTurn(position) {
            const positions = [...state.positions];
            positions[position] = state.player;
            
            setState({
            player: state.player == CIRCLE ? CROSS : CIRCLE, positions,
            })
        }
        
        function reset(){
            setState({
            player: CROSS,
            positions: [
                EMPTY,EMPTY,EMPTY,
                EMPTY,EMPTY,EMPTY,
                EMPTY,EMPTY,EMPTY
            ]
            })
        }
        const winner = detectWinner(state.positions);
        
        let sqrCount = 9;
        let squares = [];
        for(let i = 0; i < sqrCount; i++) {
            let sqrPos = <Square position={i} value={state.positions[i]} takeTurn={takeTurn} />
            squares.push(sqrPos);
        } 
        return(
            <div>
            <div className="grid">
                {squares}
            </div>
            {winner && <Result winner={winner} reset={reset}/>}
            </div>
        )     
        }

        function Square({position, value, takeTurn}) {
        // props.position
        function handleClick() {
            if(value == EMPTY) takeTurn(position)
        }
        return (
            <div className="square" onClick={handleClick}>
            {value == CIRCLE && <Circle />}
            {value == CROSS && <Cross />}
            </div>
        )
        }

        function detectWinner(p) {
        if(p[0] == CIRCLE && p[1] == CIRCLE && p[2] == CIRCLE) return CIRCLE;
        if(p[3] == CIRCLE && p[4] == CIRCLE && p[5] == CIRCLE) return CIRCLE;
        if(p[6] == CIRCLE && p[7] == CIRCLE && p[8] == CIRCLE) return CIRCLE
        
        if(p[0] == CIRCLE && p[3] == CIRCLE && p[6] == CIRCLE) return CIRCLE;
        if(p[1] == CIRCLE && p[4] == CIRCLE && p[7] == CIRCLE) return CIRCLE;
        if(p[2] == CIRCLE && p[5] == CIRCLE && p[8] == CIRCLE) return CIRCLE;
        
        if(p[0] == CIRCLE && p[4] == CIRCLE && p[8] == CIRCLE) return CIRCLE;
        if(p[2] == CIRCLE && p[4] == CIRCLE && p[6] == CIRCLE) return CIRCLE;
        
        if(p[0] == CROSS && p[1] == CROSS && p[2] == CROSS) return CROSS;
        if(p[3] == CROSS && p[4] == CROSS && p[5] == CROSS) return CROSS;
        if(p[6] == CROSS && p[7] == CROSS && p[8] == CROSS) return CROSS
        
        if(p[0] == CROSS && p[3] == CROSS && p[6] == CROSS) return CROSS;
        if(p[1] == CROSS && p[4] == CROSS && p[7] == CROSS) return CROSS;
        if(p[2] == CROSS && p[5] == CROSS && p[8] == CROSS) return CROSS;
        
        if(p[0] == CROSS && p[4] == CROSS && p[8] == CROSS) return CROSS;
        if(p[2] == CROSS && p[4] == CROSS && p[6] == CROSS) return CROSS;
        
        if(p.every(position => position != EMPTY)) return "It is a tie";
        }

        function Cross() {
        return (
            <svg width="100" height="100" viewBox="-50 -50 100 100" className="cross">
            <line x1="-40" y1="-40" x2="40" y2="40" />
            <line x1="-40" y1="40" x2="40" y2="-40" />
            </svg>
        ); 
        }

        function Circle() {
        return (
            <svg width="100" height="100" viewBox="-50 -50 100 100" className="circle">
            <circle cx="0" cy="0" r="40" />
            </svg>
        ); 
        }

        function Result({winner, reset}) {
        return(
            <div className="result">
            {winner == CIRCLE && 'Circle wins'}
            {winner == CROSS && 'Cross wins'}
            {winner == 'It is a tie' && 'It is a tie'}
            <button onClick={reset}>Reset</button>
            </div>
        ); 
        }
        return (
            <TicTacToe />
        )
    }
}

export default Main;
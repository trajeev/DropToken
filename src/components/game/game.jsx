import React, {useState} from 'react';
import './game.css'
import Board from '../board/board'
import {calculateWinner} from '../../helper'

const Game = () => {
    const [markedArray, setArray] = useState(Array(16).fill(null))
    const [nextPlayer, setPlayer] = useState(true)
    
    const winner = calculateWinner(markedArray)
    const unmarkedArray = markedArray.filter(arr => arr === null)
    let status 
    if (winner) status = 'winner' + winner;
    else if(unmarkedArray.length === 0) status = 'draw'

    const handleClick = (point) => {
        const squares = [...markedArray]
        if (calculateWinner(squares) || squares[point]) return
        squares[point] = nextPlayer ? '-blue': '-pink'
        setArray(squares)
        setPlayer(!nextPlayer)
    }

    const restart = () => {
        const newGame = Array(16).fill(null)
        setArray(newGame)
    }

    return ( 
        <div className = "game">
            <Board onclick = {(i) => handleClick(i)} markedArray = {markedArray}/>
            <button onClick = {restart} className = "button">Restart</button>
            <h2 className = "text">{status}</h2>
        </div>
    );
}

 
export default Game;
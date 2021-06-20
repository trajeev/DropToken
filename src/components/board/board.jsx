import React, {useState} from 'react';
import Bubble from '../bubble/bubble'
import './board.css'
import {calculateWinner} from '../../helper'

const Board = () => {
    const [markedArray, setArray] = useState(Array(16).fill(null))
    const [nextPlayer, setPlayer] = useState(true)
    
    const winner = calculateWinner(markedArray)
    let status 
    if (winner) status = 'winner' + winner;

    const handleClick = (point) => {
        const squares = [...markedArray]
        if (calculateWinner(squares) || squares[point]) return
        squares[point] = nextPlayer ? '-blue': '-pink'
        setArray(squares)
        setPlayer(!nextPlayer)
    }

    return ( 
        <div>
        <h2> {status} </h2>
        <div className = "Board">
            {markedArray.map((arr, i) => (
                <Bubble key = {i} colorChange = {markedArray[i]} onclick = {() => handleClick(i)}/>
            ) 
            )}
        </div>
        </div>
    );
}
 
export default Board;
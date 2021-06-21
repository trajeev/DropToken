import React from 'react';
import Bubble from '../bubble/bubble'
import './board.css'

// This component displays the board which includes all 16 bubbles.
const Board = ({markedArray, onclick, compMove}) => {
    return ( 
        <div className = "Board">
            {markedArray.map((arr, i) => (
                <Bubble key = {i} colorChange = {markedArray[i]} onclick = {() => onclick(i)}/>
            ))}
        </div>
    );
}
 
export default Board;
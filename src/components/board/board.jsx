import React from 'react';
import Bubble from '../bubble/bubble'
import './board.css'

const Board = ({markedArray, onclick}) => {
    return ( 
        <div className = "Board">
            {markedArray.map((arr, i) => (
                <Bubble key = {i} colorChange = {markedArray[i]} onclick = {() => onclick(i)}/>
            ) 
            )}
        </div>
    );
}
 
export default Board;
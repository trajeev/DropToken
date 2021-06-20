import React, {useState} from 'react';
import Bubble from '../bubble/bubble'
import './board.css'

const Board = () => {
    const [markedArray, setArray] = useState(Array(16).fill(null))
    const [nextPlayer, setPlayer] = useState(true)
    console.log(markedArray)

    const handleClick = (point) => {
        const squares = [...markedArray]
        squares[point] = nextPlayer ? '-blue': '-pink'
        setArray(squares)
        setPlayer(!nextPlayer)
    }

    return ( 
        <div className = "Board">
            {markedArray.map((arr, i) => {
                return (<Bubble key = {i} colorChange = {markedArray[i]} onclick = {() => handleClick(i)}/>)
            }  
            )}
        </div>
    );
}
 
export default Board;
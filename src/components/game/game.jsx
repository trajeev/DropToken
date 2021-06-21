import React, {useState, useEffect, useRef} from 'react';
import './game.css'
import Board from '../board/board'
import {calculateWinner, validityFunction, computerMove} from '../../helper'
import axios from 'axios'

const Game = () => {
    const [markedArray, setArray] = useState(Array(16).fill(null))
    const [nextPlayer, setPlayer] = useState(true)
    const prevMoves = useRef([])

    useEffect(() => {
        axios.get(`https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[${prevMoves.current}]`)
            .then(res => {
                const moves = res.data
                console.log('moves',moves)
                const lastMove = moves[moves.length - 1]
                const squares = [...markedArray]
                const validComputerMove = computerMove(squares, lastMove)
                if (calculateWinner(squares)) return
                squares[validComputerMove] = '-pink'
                setArray(squares)
                prevMoves.current = [...prevMoves.current, lastMove]
                console.log('prevMoves',prevMoves.current)
            })
            .catch(err => console.log(err))
    },[prevMoves.current])
    
    const winner = calculateWinner(markedArray)
    const unmarkedArray = markedArray.filter(arr => arr === null)
    let status 
    if (winner) status = 'winner' + winner;
    else if(unmarkedArray.length === 0) status = 'draw'

    const handleClick = (point) => {
        const squares = [...markedArray]
        if (validityFunction(squares, point)) {
            if (calculateWinner(squares) || squares[point]) return
            squares[point] = '-blue'
            setArray(squares)
            setPlayer(!nextPlayer)
            prevMoves.current = [...prevMoves.current, point%4]
            console.log(prevMoves.current)
        }
    }

    const restart = () => {
        const newGame = Array(16).fill(null)
        setArray(newGame)
        prevMoves.current = []
    }

    return ( 
        <div className = "game">
            <Board onclick = {
                (i) => handleClick(i)} 
                markedArray = {markedArray} />
            <button onClick = {restart} className = "button">Restart</button>
            <h2 className = "text">{status}</h2>
        </div>
    );
}

 
export default Game;
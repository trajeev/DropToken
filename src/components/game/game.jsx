import React, {useState, useEffect, useRef} from 'react';
import './game.css'
import Board from '../board/board'
import {calculateWinner, validityFunction, computerMove} from '../../helper'
import axios from 'axios'

const Game = () => {
    const [markedArray, setArray] = useState(Array(16).fill(null))
    const [userFirst, setPlayer] = useState(true)
    const prevMoves = useRef([])

    useEffect(() => {
        if (!userFirst)
        {axios.get(`https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[${prevMoves.current}]`)
            .then(res => {
                const moves = res.data
                const lastMove = moves[moves.length - 1]
                const squares = [...markedArray]
                const validComputerMove = computerMove(squares, lastMove)
                if (calculateWinner(squares)) return
                squares[validComputerMove] = '-pink'
                setArray(squares)
                prevMoves.current = [...prevMoves.current, lastMove]
            })
            .catch(err => console.log(err))}
            // eslint-disable-next-line
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
            if (userFirst) setPlayer(false)
            squares[point] = '-blue'
            setArray(squares)
            prevMoves.current = [...prevMoves.current, point%4]
        }
    }

    const restart = () => {
        const newGame = Array(16).fill(null)
        setArray(newGame)
        prevMoves.current = []
        setPlayer(true)
    }

    const playerFirst = () => {
        setPlayer(true)
        console.log(userFirst)
    }

    const computerFirst = () => {
        setPlayer(userFirst => false)
        console.log(userFirst)
    }

    return ( 
        <div className = "game">
            <Board onclick = {
                (i) => handleClick(i)} 
                markedArray = {markedArray} />
            <button onClick = {restart} className = "button">Restart</button>
            <div className = "buttons">
                <button onClick = {playerFirst} >you first</button>
                <button onClick = {computerFirst}>computer first</button>
            </div>
            <h2 className = "text">{status}</h2>
        </div>
    );
}

 
export default Game;
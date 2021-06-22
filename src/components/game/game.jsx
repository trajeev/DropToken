import React, {useState, useEffect, useRef} from 'react';
import './game.css'
import Board from '../board/board'
import {calculateWinner, validityFunction, computerMove} from '../../helper'
import axios from 'axios'

// Main component where state is handled and api calls to the service.

const Game = () => {
    // usestate is used to store data of the game and who plays first. Useref is used to store computer's moves.
    const [markedArray, setArray] = useState(Array(16).fill(null))
    const [userFirst, setPlayer] = useState(true)
    const prevMoves = useRef([])

    useEffect(() => {
        if (!userFirst)
        {
            axios.get(`https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[${prevMoves.current}]`)
            .then(res => {
                const moves = res.data
                const lastMove = moves[moves.length - 1]
                const squares = [...markedArray]
                const validComputerMove = computerMove(squares, lastMove)
                if (calculateWinner(squares)) return
                squares[validComputerMove] = 'computer'
                setArray(squares)
                prevMoves.current = [...prevMoves.current, lastMove]
            })
            .catch(err => console.log(err))
        }
            // eslint-disable-next-line
    },[prevMoves.current])
    
    // This logic is used to show status of the match at the end.
    const winner = calculateWinner(markedArray)
    const unmarkedArray = markedArray.filter(arr => arr === null)
    let status 
    if (winner) status = 'winner-' + winner
    else if(unmarkedArray.length === 0) status = 'draw'

    // This function handles whenever a bubble is clicked by user.
    const handleClick = (point) => {
        const squares = [...markedArray]
        if (validityFunction(squares, point)) {
            if (calculateWinner(squares) || squares[point]) return
            if (userFirst) setPlayer(false)
            console.log(userFirst)
            squares[point] = 'user'
            setArray(squares)
            prevMoves.current = [...prevMoves.current, point%4]
        }
    }

    // This is for restart button, which sets all values to the inital value
    const restart = () => {
        const newGame = Array(16).fill(null)
        setArray(newGame)
        prevMoves.current = []
        setPlayer(true)
    }

    // This is for player first
    const playerFirst = () => {
        setPlayer(true)
    }

    // This is for computer first.
    const computerFirst = () => {
        axios.get(`https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[${prevMoves.current}]`)
            .then(res => {
                const moves = res.data
                const lastMove = moves[moves.length - 1]
                const squares = [...markedArray]
                const validComputerMove = computerMove(squares, lastMove)
                if (calculateWinner(squares)) return
                squares[validComputerMove] = 'computer'
                setArray(squares)
                prevMoves.current = [...prevMoves.current, lastMove]
            })
            .catch(err => console.log(err))
        setPlayer(false)
    }

    // Render function.
    return ( 
        <div className = "game">
            <Board 
                onclick = {(i) => handleClick(i)} 
                markedArray = {markedArray} />
            <button onClick = {restart} className = "button">Restart</button>
            <div className = "buttons">
                <button className = "user-button" onClick = {playerFirst} >You first</button>
                <button className = "computer-button" onClick = {computerFirst}>Computer first</button>
            </div>
            <h2 className = "text">{status}</h2>
        </div>
    );
}

 
export default Game;
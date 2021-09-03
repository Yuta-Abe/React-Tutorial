import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import type { Squares } from './components/Board'
import { Board } from './components/index'
import './index.css'

const calculateWinner = (squares: Squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i += 1) {
        const [a, b, c] = lines[i]
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }
    return null
}

const Game = () => {
    const [history, setHistory] = useState<Squares[]>([Array(9).fill(null)])
    const [xIsNext, setXIsNext] = useState(true)
    const [stepNumber, setStepNumber] = useState(0)

    const current = history[stepNumber]

    const handleClick = (i: number) => {
        const newHistory = history.slice(0, stepNumber + 1)
        const newCurrent = newHistory[newHistory.length - 1]
        // なぜかSlice()を入れたら'X'が表示された…なぜ？
        // Sliceを入れないと'X'は表示されなかった…
        // 一応イミュータビリティから.sliceはつけておく
        const squares: Squares = newCurrent.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = xIsNext ? 'X' : 'O'
        setHistory(newHistory.concat([squares]))
        setStepNumber(newHistory.length)
        setXIsNext(!xIsNext)
    }

    const jumpTo = (step: number) => {
        setStepNumber(step)
        setXIsNext(step % 2 === 0)
    }

    const winner = calculateWinner(current)

    const moves = history.map((step, move) => {
        const desc = move ? `Go to move #${move}` : 'Go to game start'
        const key = move
        return (
            <li key={key}>
                <button type="button" onClick={() => jumpTo(move)}>
                    {desc}
                </button>
            </li>
        )
    })

    let status: string
    if (winner) {
        status = `Winner: ${winner}`
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current} onClick={(i) => handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))

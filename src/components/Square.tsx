import React from 'react'
import '../index.css'

export type SquareDisp = 'O' | 'X' | null

type Props = {
    value: SquareDisp
    onClick: () => void
}

const Square = ({ value, onClick }: Props) => {
    return (
        <button className="square" type="button" onClick={onClick}>
            {value}
        </button>
    )
}

export default Square

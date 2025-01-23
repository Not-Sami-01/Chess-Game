import React from 'react'
import { FaChessBishop, FaChessKnight, FaChessQueen, FaChessRook } from 'react-icons/fa'

const ChessSwitchDropDown = ({theme, promotePawn}) => {
  const themeClass = theme;
  return (
    <ul className={`style-none ${theme === 'light' ?'change-piece-dropdown-light': 'change-piece-dropdown-dark'}`}>
      <li onClick={()=>promotePawn('bishop')}><FaChessBishop className={themeClass}/></li>
      <li onClick={()=>promotePawn('queen')}><FaChessQueen className={themeClass}/></li>
      <li onClick={()=>promotePawn('knight')}><FaChessKnight className={themeClass}/></li>
      <li onClick={()=>promotePawn('rook')}><FaChessRook className={themeClass}/></li>
    </ul>
  )
}

export default ChessSwitchDropDown
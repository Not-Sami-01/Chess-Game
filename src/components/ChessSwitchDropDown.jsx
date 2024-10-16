import React from 'react'
import { FaChessBishop, FaChessKnight, FaChessQueen, FaChessRook } from 'react-icons/fa'

const ChessSwitchDropDown = ({theme}) => {
  const themeClass = theme? 'light': 'dark'; 
  return (
    <ul className='style-none change-piece-dropdown'>
      <li className='px-1 py-1'><FaChessBishop className={themeClass}/></li>
      <li className='px-1 py-1'><FaChessQueen className={themeClass}/></li>
      <li className='px-1 py-1'><FaChessKnight className={themeClass}/></li>
      <li className='px-1 py-1'><FaChessRook className={themeClass}/></li>
    </ul>
  )
}

export default ChessSwitchDropDown
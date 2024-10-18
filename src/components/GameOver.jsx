import React from 'react'
import { IoClose } from 'react-icons/io5'

const GameOver = ({resetChessBoard, cancelModal}) => {
  const restartGame = () => {
    resetChessBoard();
    cancelModal();
  }
  return (
    <div className='game-over-overlay'>
      <div className="game-over-body px-2 py-2 rounded">
        <button className='game-over-close-icon'>
          <IoClose onClick={cancelModal} />
        </button>
        <h1 className='text-center'>
          Game Over
        </h1>
        <p className='my-4 text-center'>
          Light Won by <b>CheckMate</b>
        </p>
        <div className="game-over-footer">
          <button className='game-over-btn' onClick={restartGame}>Restart</button>
          <button className='game-over-btn' onClick={cancelModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default GameOver
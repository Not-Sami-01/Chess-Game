import React, { useEffect, useState } from 'react'
import { checkContains, checkIfSetsTerrorToKing, checkKingTerrorAndSelectMoves, getMoves} from './ChessPiece';
import GameOver from './GameOver';
export default function ChessBoard({
  chessBoard,
  setChessBoard,
  lightDeadPieces,
  setLightDeadPieces,
  darkDeadPieces,
  setDarkDeadPieces,
  turn,
  setTurn,
  inverseAnimation,
  rotateBoard,
  kings,
  setKings,
  lightTerror,
  setLightTerror,
  darkTerror,
  setDarkTerror,
  disableChessboard,
  setDisableChessboard,
  gameOverModal,
  setGameOverModal,
  resetChessBoard
}) {

  const [activePiece, setActivePiece] = useState(null);
  const [moves, setMoves] = useState([]);


  // const [isAllowed, setIsAllowed] = useState(true);
  const handleChessClick = (piece, row, col) => {
    if(disableChessboard){
      return;
    }
    if (activePiece) {
      const newPiece = activePiece;
      newPiece.moves = getMoves(chessBoard, newPiece);
      setActivePiece(newPiece);
      setActivePiece(chessBoard[activePiece.xPos][activePiece.yPos]);
      const pieceSound = movePiece(row, col);
      checkKingTerrorAndSelectMoves(chessBoard, setChessBoard, kings, setKings, pieceSound, setLightTerror, setDarkTerror);
      setActivePiece(null);
    } else {
      setActivePiece(piece);
    }
  }
  const movePiece = (row, col) => {
    if (checkIfSetsTerrorToKing([row, col], chessBoard,kings , activePiece)) {
      setActivePiece(null);
      return 0;
    }
    let newPos = [row, col];
    let pieceSound = 0;
    if (checkContains(activePiece.moves, newPos) && ((turn === true && activePiece.theme === 'light') || (turn === false && activePiece.theme === 'dark'))) {
      if (chessBoard[row][col] !== null) {
        if (chessBoard[row][col].name !== 'king') {
          let piece = chessBoard[row][col];
          if (activePiece.theme === piece.theme) {
            setActivePiece(null);
            return;
          } else {
            pieceSound = 2;
            const tempChessBoard = chessBoard;
            tempChessBoard[piece.xPos][piece.yPos] = null;
            setChessBoard([...tempChessBoard])
            if (piece.theme === 'light') {
              setLightDeadPieces([...lightDeadPieces, piece])
            } else if (piece.theme === 'dark') {
              setDarkDeadPieces([...lightDeadPieces, piece]);
            }
          }
        } else {
          // alert('I am in else')
          setActivePiece(null);
          return;
        }
      } else {
        pieceSound = 1
      }
      let tempChessBoard = chessBoard;
      tempChessBoard[activePiece.xPos][activePiece.yPos] = null;
      const piece = activePiece;
      piece.xPos = row;
      piece.yPos = col;
      piece.moves = getMoves(chessBoard, piece);
      if (piece.name === 'pawn' && !piece.firstMove) {
        piece.firstMove = true;
      }
      tempChessBoard[row][col] = piece;
      if (piece.name === 'king') {
        if (piece.theme === 'light') {
          setKings({ ...kings, lightKing: piece });
        } else {
          setKings({ ...kings, darkKing: piece });
        }
      } else {
        setChessBoard([...tempChessBoard])
      }
      setTurn(!turn)
      setActivePiece(null);
    } else {
      pieceSound = 0;
      setActivePiece(null);
    }
    return pieceSound;
  }

  useEffect(() => {
    if (activePiece) {
      setMoves(getMoves(chessBoard, activePiece))
    } else {
      setMoves([]);
    }
  }, [activePiece, chessBoard,]);
  // useEffect(()=>{
  //   if(terror){
  //     document.getElementById(terror).classList.add('terror');
  //   }else{
  //     // document.getElementById(terror).classList.remove('terror');
  //   }
  // }, [terror])
  const checkPieceTheme = (pos) => {
    if (activePiece) {
      return activePiece.theme !== chessBoard[pos[0]][pos[1]]?.theme;
    }
  }
  const cancelModal = () => setGameOverModal(false);
  return (
    <div className='h-max py-4'>
      <div className="chessboard-container">
        <div className="dead-container">
          <div className="dark-dead-pieces">
            {darkDeadPieces.map(piece => <span key={`${piece.xPos + piece.yPos * Math.random()}key`} className='dark'>{piece.component}</span>)}
          </div>
        </div>
        <div className={`chessboard ${((inverseAnimation && !turn) || rotateBoard) ? 'inverse' : ''}`}>
          {
            chessBoard?.map((rowArr, row) => (
              <div key={row} className="row">
                {rowArr?.map((colObj, col) => {
                  return (
                    <div
                      key={`${row}-${col * Math.random()} *`}
                      onClick={() => handleChessClick(chessBoard[row][col], row, col)}
                      id={row + '-' + col}
                      className={`cell ${lightTerror === `${row}-${col}` || darkTerror === `${row}-${col}` ? 'terror' : ''} ${(row + col) % 2 !== 0 ? 'light-cell' : 'dark-cell'}`}
                    >
                      {moves && moves.some(move => move[0] === row && move[1] === col) && checkPieceTheme([row, col]) && <span className="moveable-cell" />}
                      {chessBoard[row][col]?.component}
                    </div>
                  );
                })}
              </div>
            ))
          }
        {gameOverModal && 
        <GameOver
        cancelModal={cancelModal}
        resetChessBoard={resetChessBoard}
        />}
        </div>

        <div className="dead-container">
          <div className="light-dead-pieces">
            {lightDeadPieces.map(piece => <span className='light' key={`${piece.xPos + piece.yPos * Math.random()}key`}>{piece.component}</span>)}
          </div>
        </div>
      </div>

    </div>
  )
}

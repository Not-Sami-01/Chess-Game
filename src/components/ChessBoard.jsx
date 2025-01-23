import React, { useEffect, useState } from 'react'
import { changePiece, checkContains, checkIfSetsTerrorToKing, checkKingTerrorAndSelectMoves, getMoves, playSound, refreshAllMoves } from './ChessPiece';
import GameOver from './GameOver';
import ChessSwitchDropDown from './ChessSwitchDropDown';
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
  resetChessBoard,
  gameOverMessage,
  setGameOverMessage,
  gameOver,
  posToMove,
  setPosToMove,
}) {

  const [activePiece, setActivePiece] = useState(null);
  const [moves, setMoves] = useState([]);
  let pieceSound = null;

  const promotePawn = (name) => {
    if (posToMove && activePiece && activePiece.name === 'pawn') {
      let tempChessBoard = chessBoard;
      tempChessBoard[activePiece.xPos][activePiece.yPos] = null;
      let newPiece = changePiece(activePiece, name);
      newPiece.xPos = posToMove[0];
      newPiece.yPos = posToMove[1];
      tempChessBoard[posToMove[0]][posToMove[1]] = newPiece;
      setChessBoard(refreshAllMoves(tempChessBoard));
      setActivePiece(null);
      setTurn(!turn);
      setPosToMove([]);
      setDisableChessboard(false);
      checkKingTerrorAndSelectMoves(chessBoard, setChessBoard, kings, setKings, pieceSound, setLightTerror, setDarkTerror);
    }
  }
  const handleChessClick = (piece, row, col) => {
    if (disableChessboard) {
      return;
    }
    if (activePiece) {
      const newPiece = activePiece;
      newPiece.moves = getMoves(chessBoard, newPiece);
      setActivePiece(newPiece);
      setActivePiece(chessBoard[activePiece.xPos][activePiece.yPos]);
      const pieceSound = movePiece(row, col);
      if(pieceSound === -1){
        return;
      }
      setChessBoard(refreshAllMoves(chessBoard));
      checkKingTerrorAndSelectMoves(chessBoard, setChessBoard, kings, setKings, pieceSound, setLightTerror, setDarkTerror);
      setActivePiece(null);
    } else {
      setActivePiece(piece);
    }
  }

  // Move th
  const movePiece = (row, col) => {
    if (checkIfSetsTerrorToKing([row, col], chessBoard, kings, activePiece)) {
      setActivePiece(null);
      return 0;
    }
    let newPos = [row, col];
    if (checkContains(activePiece.moves, newPos) && ((turn === true && activePiece.theme === 'light') || (turn === false && activePiece.theme === 'dark'))) {
      if (chessBoard[row][col] !== null) {
        if (chessBoard[row][col].name === 'king') {
          setActivePiece(null);
          return 0;
        } else {
          const piece = chessBoard[row][col];
          if (activePiece.theme === piece.theme) {
            setActivePiece(null);
            return;
          } else {
            const tempChessBoard = chessBoard;
            tempChessBoard[piece.xPos][piece.yPos] = null;
            setChessBoard([...tempChessBoard])
            if (piece.theme === 'light') {
              setLightDeadPieces([...lightDeadPieces, piece])
            } else if (piece.theme === 'dark') {
              setDarkDeadPieces([...lightDeadPieces, piece]);
            }
          }
        }
        pieceSound = 2
      } else {
        pieceSound = 1
      }
      const piece = activePiece;
      if (piece.name === 'pawn' && ((piece.theme === 'light' && col === 0) || (piece.theme === 'dark' && col === 7))) {
        setDisableChessboard(true);
        setPosToMove([row, col]);
        return -1;
      }
      // setPieceSound(4)
      playSound(pieceSound, (val) => {pieceSound = val} );
      let tempChessBoard = chessBoard;
      tempChessBoard[activePiece.xPos][activePiece.yPos] = null;
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
      setActivePiece(null);
    }
  }

  useEffect(() => {
    if (activePiece) {
      setMoves(getMoves(chessBoard, activePiece))
    } else {
      setMoves([]);
    }
  }, [activePiece, chessBoard,]);
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
                      {moves && moves.some(move => move[0] === row && move[1] === col) && checkPieceTheme([row, col]) && <span className={"moveable-cell" + (chessBoard[row][col] === null ? '': '-red')} />}
                      {chessBoard[row][col]?.component}
                      {posToMove[0] === row && posToMove[1] === col && col === 0 && <ChessSwitchDropDown promotePawn={promotePawn} theme={'light'} />}
                      {posToMove[0] === row && posToMove[1] === col && col === 7 && <ChessSwitchDropDown promotePawn={promotePawn} theme={'dark'} />}
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
              gameOverMessage={gameOverMessage}
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

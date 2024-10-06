import React, { useEffect, useState } from 'react'
import { checkContains, checkKingMoves, getMoves, refreshAllMoves, setUpChessBoard } from './ChessPiece';
export default function ChessBoard() {
  const getChessboardArray = () => {
    const board = [];
    for (let i = 1; i < 9; i++) {
      let arr = [];
      for (let j = 0; j < 8; j++) {
        arr[j] = null;
      }
      board.push(arr);
    }
    return board;
  }
  const [turn, setTurn] = useState(true);
  const tempBoard = getChessboardArray();
  const [chessBoard, setChessBoard] = useState(tempBoard);
  const [activePiece, setActivePiece] = useState(null);
  const [lightDeadPieces, setLightDeadPieces] = useState([]);
  const [darkDeadPieces, setDarkDeadPieces] = useState([]);
  const handleChessClick = (piece, row, col) => {
    if (activePiece) {
      const newPiece = activePiece;
      newPiece.moves = getMoves(chessBoard, newPiece);
      setActivePiece(newPiece);
      setChessBoard(refreshAllMoves(chessBoard));
      setActivePiece(chessBoard[activePiece.xPos][activePiece.yPos]);
      movePiece(row, col);
    } else {
      const moves = getMoves(chessBoard, piece)
      piece.moves = [...moves];
      setActivePiece(piece);
    }
  }
  const movePiece = (row, col) => {
    let newPos = [row, col];
    if (checkContains(activePiece.moves, newPos) && ((turn === true && activePiece.theme === 'light') || (turn === false && activePiece.theme === 'dark'))) {
      if (chessBoard[row][col] !== null) {
        let piece = chessBoard[row][col];
        if (activePiece.theme === piece.theme) {
          setActivePiece(null);
          return;
        } else {
          const tempChessBoard = chessBoard;
          tempChessBoard[piece.xPos][piece.yPos] = null;
          setChessBoard([...tempChessBoard])
          if (piece.theme === 'light') {
            setLightDeadPieces([...lightDeadPieces, piece])
          } else if(piece.theme === 'dark') {
            setDarkDeadPieces([...lightDeadPieces, piece]);
          }
        }
      }
      let tempChessBoard = chessBoard;
      tempChessBoard[activePiece.xPos][activePiece.yPos] = null;
      const piece = activePiece;
      piece.xPos = row;
      piece.yPos = col;
      if(piece.name === 'pawn' && !piece.firstMove){
        piece.firstMove = true;
      }
      tempChessBoard[row][col] = piece;
      setChessBoard([...tempChessBoard])
      setTurn(!turn)
      setActivePiece(null);
    } else {
      setActivePiece(null);
    }
  }
  useEffect(() => {
    setUpChessBoard(chessBoard, setChessBoard);
    checkKingMoves(chessBoard, 'light');
    // rook.moves = getMoves(chessBoard, rook);
    // rook2.moves = getMoves(chessBoard, rook2);
    // let tempChessBoard = chessBoard;
    // tempChessBoard[rook.xPos][rook.yPos] = rook;
    // tempChessBoard[rook2.xPos][rook2.yPos] = rook2;
    // setChessBoard([...tempChessBoard]);
  }, [])
  return (
    <div className='h-max py-4'>
      <div className="chessboard-container">
        <div className="dark-dead-pieces">
          {darkDeadPieces.map(piece => <span key={`${piece.xPos + piece.yPos}key`} className='dark'>{piece.component}</span>)}
        </div>
        <div className={`chessboard ${false && !turn && 'inverse'}`}>
          {
            chessBoard?.map((rowArr, row) => (
              <div key={row} className="row">
                {rowArr?.map((colObj, col) => {
                  const arr = [row, col];
                  return (
                    <div
                      key={`${row}-${col}`}
                      onClick={() => handleChessClick(chessBoard[row][col], row, col)}
                      id={row + '-'+col}
                      className={`cell ${(row + col) % 2 !== 0 ? 'light-cell' : 'dark-cell'}`}
                    >
                      {activePiece && activePiece?.moves.some(move => move[0] === row && move[1] === col) && <span className="moveable-cell" />}
                      {chessBoard[row][col]?.component}
                    </div>
                  );
                })}
              </div>
            ))
          }
          {/* {
            turn && chessBoard?.map((rowArr, row) => (
              <div key={row} className="row">
                {rowArr?.map((colObj, col) => {
                  const arr = [row, col];
                  return (
                    <div
                      key={`${row}-${col}`}
                      onClick={() => handleChessClick(chessBoard[row][col], row, col)}
                      id={row + '-'+col}
                      className={`cell ${(row + col) % 2 !== 0 ? 'light-cell' : 'dark-cell'}`}
                    >
                      {activePiece && activePiece?.moves.some(move => move[0] === row && move[1] === col) && <span className="moveable-cell" />}
                      {chessBoard[row][col]?.component}
                    </div>
                  );
                })}
              </div>
            ))
          } */}
        </div>
        <div className="light-dead-pieces">
          {lightDeadPieces.map(piece => <span className='light' key={`${piece.xPos + piece.yPos}key`}>{piece.component}</span>)}
        </div>
      </div>

    </div>
  )
}

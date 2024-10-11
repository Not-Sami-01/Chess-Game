import React, { useEffect, useState } from 'react'
import { checkContains, checkKingTerrorAndSelectMoves, getMoves, pieceDieSound, pieceMoveSound, playSound, refreshAllMoves} from './ChessPiece';
export default function ChessBoard({ chessBoard, setChessBoard, lightDeadPieces, setLightDeadPieces, darkDeadPieces, setDarkDeadPieces, turn, setTurn, inverseAnimation, rotateBoard, kings, setKings }) {

  const [activePiece, setActivePiece] = useState(null);
  const [moves, setMoves] = useState([]);
  const [lightTerror, setLightTerror] = useState(null);
  const [darkTerror, setDarkTerror] = useState(null);

  // const [isAllowed, setIsAllowed] = useState(true);
  const handleChessClick = (piece, row, col) => {
    setChessBoard(refreshAllMoves(chessBoard))
    if (activePiece) {
      const newPiece = activePiece;
      newPiece.moves = getMoves(chessBoard, newPiece);
      setActivePiece(newPiece);
      setActivePiece(chessBoard[activePiece.xPos][activePiece.yPos]);
      movePiece(row, col);
      setActivePiece(null);
    } else {
      setActivePiece(piece);
    }
  }
  const movePiece = (row, col) => {
    let newPos = [row, col];
    let pieceSound = 0;
    if (checkContains(activePiece.moves, newPos) && ((turn === true && activePiece.theme === 'light') || (turn === false && activePiece.theme === 'dark'))) {
      if (chessBoard[row][col] !== null) {
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
      }else{
        pieceSound = 1
      }
      let tempChessBoard = chessBoard;
      tempChessBoard[activePiece.xPos][activePiece.yPos] = null;
      const piece = activePiece;
      piece.xPos = row;
      piece.yPos = col;
      piece.moves = getMoves(chessBoard, piece)
      if (piece.name === 'pawn' && !piece.firstMove) {
        piece.firstMove = true;
      }
      tempChessBoard[row][col] = piece;
      if(piece.name === 'king'){
        if(piece.theme === 'light'){
          setKings({...kings, lightKing: piece});
        }else{
          setKings({...kings, darkKing: piece});
        }
      }else{
        setChessBoard([...tempChessBoard])
        setChessBoard(refreshAllMoves(chessBoard));
      }
      setTurn(!turn)
      setActivePiece(null);
    } else {
      pieceSound = 0;
      setActivePiece(null);
    }
    setChessBoard(refreshAllMoves(chessBoard));
    checkKingTerrorAndSelectMoves(chessBoard, kings, setKings, pieceSound, setLightTerror, setDarkTerror);


  }
  useEffect(() => {
    if (activePiece) {
      setMoves(getMoves(chessBoard, activePiece))
    } else {
      setMoves([]);
    }
  }, [activePiece]);
  // useEffect(()=>{
  //   if(terror){
  //     document.getElementById(terror).classList.add('terror');
  //   }else{
  //     // document.getElementById(terror).classList.remove('terror');
  //   }
  // }, [terror])
  return (
    <div className='h-max py-4'>
      <div className="chessboard-container">
        {/* {activePiece && <div className="piec">Active</div>} */}
        <div className="dead-container">
          Dead Pieces: 
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
                      {moves && moves.some(move => move[0] === row && move[1] === col) && <span className="moveable-cell" />}
                      {chessBoard[row][col]?.component}
                    </div>
                  );
                })}
              </div>
            ))
          }
        </div>
        <div className="dead-container">
                Dead Pieces: 
          <div className="light-dead-pieces">
            {lightDeadPieces.map(piece => <span className='light' key={`${piece.xPos + piece.yPos * Math.random()}key`}>{piece.component}</span>)}
          </div>
        </div>
      </div>

    </div>
  )
}

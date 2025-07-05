import { FaChessBishop, FaChessKing, FaChessKnight, FaChessPawn, FaChessQueen, FaChessRook } from "react-icons/fa";
export const getMoves = (chessBoard, piece) => {
  let movesToSet = [];
  switch (piece.name) {
    // Moves for Rook
    case 'rook':
      movesToSet = getAllStraightMoves(chessBoard, piece);
      break;

    // Moves for Bishop
    case 'bishop':
      movesToSet = getAllDiagonalMoves(chessBoard, piece);
      break;

    // Moves for Queen
    case 'queen':
      movesToSet = [...getAllStraightMoves(chessBoard, piece), ...getAllDiagonalMoves(chessBoard, piece)];
      break;

    // Moves for King
    case 'king':
      movesToSet = getBoxMoves(chessBoard, piece);
      break;

    // Moves for Knight
    case 'knight':
      movesToSet = getAllLShapeMoves(chessBoard, piece);
      break;

    // Moves for Pawn
    case 'pawn':
      movesToSet = getPawnMoves(chessBoard, piece);
      break;
    default:
      break;
  }
  return movesToSet;
}

export const checkContains = (moves, pos) => {
  let val = false;
  for (let i in moves) {
    if (moves[i][0] === pos[0] && moves[i][1] === pos[1]) {
      val = true;
      break;
    }
  }
  return val;
}
export const refreshAllMoves = (chessBoard) => {
  for (const i in chessBoard) {
    for (const j in chessBoard[i]) {
      if (chessBoard[i][j] === null) {
        continue;
      } else {
        const piece = chessBoard[i][j]
        chessBoard[i][j].moves = getMoves(chessBoard, piece);
      }
    }
  }
  return chessBoard;
}
export function setUpChessBoard(chessBoard, callBack) {
  const pieces = [
    // Dark Rooks
    {
      // Left Rook
      name: 'rook',
      xPos: 0,
      yPos: 0,
      moves: [],
      component: <FaChessRook className="dark" />,
      theme: 'dark',
      totalMoves: [],
    },
    {
      // Right Rook
      name: 'rook',
      xPos: 7,
      yPos: 0,
      moves: [],
      component: <FaChessRook className="dark" />,
      theme: 'dark',
      totalMoves: [],

    },
    // Light Rooks
    {
      // Left Rook
      name: 'rook',
      xPos: 0,
      yPos: 7,
      moves: [],
      component: <FaChessRook className="light" />,
      theme: 'light',
      totalMoves: [],

    },
    {
      // Right Rook
      name: 'rook',
      xPos: 7,
      yPos: 7,
      moves: [],
      component: <FaChessRook className="light" />,
      theme: 'light',
      totalMoves: [],
    },
    // Dark Bishops
    {
      // Left Bishop
      name: 'bishop',
      xPos: 2,
      yPos: 0,
      moves: [],
      component: <FaChessBishop className="dark" />,
      theme: 'dark',
      totalMoves: []
    },
    {
      // Right Bishop
      name: 'bishop',
      xPos: 5,
      yPos: 0,
      moves: [],
      component: <FaChessBishop className="dark" />,
      theme: 'dark',
      totalMoves: []
    },
    // Light Bishops
    {
      // Left Bishop
      name: 'bishop',
      xPos: 2,
      yPos: 7,
      moves: [],
      component: <FaChessBishop className="light" />,
      theme: 'light',
      totalMoves: []
    },
    {
      // Right Bishop
      name: 'bishop',
      xPos: 5,
      yPos: 7,
      moves: [],
      component: <FaChessBishop className="light" />,
      theme: 'light',
      totalMoves: []
    },
    // Dark Queen
    {
      name: 'queen',
      xPos: 3,
      yPos: 0,
      moves: [],
      component: <FaChessQueen className="dark" />,
      theme: 'dark',
      totalMoves: []
    },
    // Light Queen
    {
      name: 'queen',
      xPos: 3,
      yPos: 7,
      moves: [],
      component: <FaChessQueen className="light" />,
      theme: 'light',
      totalMoves: []
    },
    // Dark King
    {
      name: 'king',
      xPos: 4,
      yPos: 0,
      moves: [],
      component: <FaChessKing className="dark" />,
      theme: 'dark',
      terror: false,
    },
    // Light King
    {
      name: 'king',
      xPos: 4,
      yPos: 7,
      moves: [],
      component: <FaChessKing className="light" />,
      theme: 'light',
      terror: false,
    },
    // Dark Knights
    {
      // Left Knight
      name: 'knight',
      xPos: 1,
      yPos: 0,
      moves: [],
      component: <FaChessKnight className="dark" />,
      theme: 'dark',
    },
    {
      // Right Knight
      name: 'knight',
      xPos: 6,
      yPos: 0,
      moves: [],
      component: <FaChessKnight className="dark" />,
      theme: 'dark',
    },
    // Light Knights
    {
      // Left Knight
      name: 'knight',
      xPos: 1,
      yPos: 7,
      moves: [],
      component: <FaChessKnight className="light" />,
      theme: 'light',
    },
    {
      // Right Knight
      name: 'knight',
      xPos: 6,
      yPos: 7,
      moves: [],
      component: <FaChessKnight className="light" />,
      theme: 'light',
    },
    // Dark Pawns
  ];
  for (let i = 0; i < 8; i++) {
    pieces.push({
      name: 'pawn',
      xPos: i,
      yPos: 1,
      moves: [],
      component: <FaChessPawn className="dark" />,
      theme: 'dark',
      firstMove: false,
    });
  }
  for (let i = 0; i < 8; i++) {
    pieces.push(
      {
        name: 'pawn',
        xPos: i,
        yPos: 6,
        moves: [],
        component: <FaChessPawn className="light" />,
        theme: 'light',
        firstMove: false,
      }
    );
  }
  for (let piece of pieces) {
    chessBoard[piece.xPos][piece.yPos] = piece;
  }
  const darkKing = chessBoard[4][0];
  const lightKing = chessBoard[4][7];
  const chessBoardWithMoves = chessBoard = refreshAllMoves(chessBoard);
  callBack([...chessBoardWithMoves]);
  return { darkKing, lightKing };
}



const getAllStraightMoves = (chessBoard, piece) => {
  var pieceMoves = [];

  // Check downwards
  for (let row = piece.xPos - 1; row >= 0; row--) {
    const col = piece.yPos;
    if (chessBoard[row][col] === null) {
      pieceMoves.push([row, col]);
    } else {
      if (chessBoard[row][col].theme !== piece.theme) {
        pieceMoves.push([row, col]);
      } else if (chessBoard[row][col].theme === piece.theme) {
        pieceMoves.push([row, col]);
        break;
      }
      break;
    }
  }

  // Check upwards
  for (let row = piece.xPos + 1; row < 8; row++) {
    const col = piece.yPos;
    if (chessBoard[row][col] === null) {
      pieceMoves.push([row, col]);
    } else {
      if (chessBoard[row][col].theme !== piece.theme) {
        pieceMoves.push([row, col]);
      } else if (chessBoard[row][col].theme === piece.theme) {
        pieceMoves.push([row, col]);
        break;
      }
      break;
    }
  }

  // Check left
  for (let col = piece.yPos - 1; col >= 0; col--) {
    const row = piece.xPos;
    if (chessBoard[row][col] === null) {
      pieceMoves.push([row, col]);
    } else {
      if (chessBoard[row][col].theme !== piece.theme) {
        pieceMoves.push([row, col]);
      } else if (chessBoard[row][col].theme === piece.theme) {
        pieceMoves.push([row, col]);
        break;
      }
      break;
    }
  }

  // Check right
  for (let col = piece.yPos + 1; col < 8; col++) {
    const row = piece.xPos;
    if (chessBoard[row][col] === null) {
      pieceMoves.push([row, col]);
    } else {
      if (chessBoard[row][col].theme !== piece.theme) {
        pieceMoves.push([row, col]);
      } else if (chessBoard[row][col].theme === piece.theme) {
        pieceMoves.push([row, col]);
        break;
      }
      break;
    }
  }
  return pieceMoves;

}


function getAllDiagonalMoves(chessBoard, piece) {
  var pieceMoves = [];

  // Check upper-left diagonal
  for (let row = piece.xPos - 1, col = piece.yPos - 1; row >= 0 && col >= 0; row--, col--) {
    if (chessBoard[row][col] === null) {
      pieceMoves.push([row, col]);
    } else {
      if (chessBoard[row][col].theme !== piece.theme) {
        pieceMoves.push([row, col]);
      } else if (chessBoard[row][col].theme === piece.theme) {
        pieceMoves.push([row, col]);
        break;
      }
      break;
    }
  }

  // Check upper-right diagonal
  for (let row = piece.xPos + 1, col = piece.yPos - 1; row < 8 && col >= 0; row++, col--) {
    if (chessBoard[row][col] === null) {
      pieceMoves.push([row, col]);
    } else {
      if (chessBoard[row][col].theme !== piece.theme) {
        pieceMoves.push([row, col]);
      } else if (chessBoard[row][col].theme === piece.theme) {
        pieceMoves.push([row, col]);
        break;
      }
      break;
    }
  }

  // Check bottom-left diagonal
  for (let col = piece.yPos + 1, row = piece.xPos - 1; col < 8 && row >= 0; col++, row--) {
    if (chessBoard[row][col] === null) {
      pieceMoves.push([row, col]);
    } else {
      if (chessBoard[row][col].theme !== piece.theme) {
        pieceMoves.push([row, col]);
      } else if (chessBoard[row][col].theme === piece.theme) {
        pieceMoves.push([row, col]);
        break;
      }
      break;
    }
  }

  // Check bottom-right diagonal
  for (let col = piece.yPos + 1, row = piece.xPos + 1; col < 8 && row < 8; col++, row++) {
    if (chessBoard[row][col] === null) {
      pieceMoves.push([row, col]);
    } else {
      if (chessBoard[row][col].theme !== piece.theme) {
        pieceMoves.push([row, col]);
      } else if (chessBoard[row][col].theme === piece.theme) {
        pieceMoves.push([row, col]);
        break;
      }
      break;
    }
  }
  return pieceMoves;
}


function getBoxMoves(chessBoard, piece) {
  let row = piece.xPos;
  let col = piece.yPos;
  let pieceMoves = [];
  // Check upward
  if (col !== 7 && (chessBoard[row][col + 1] === null || chessBoard[row][col + 1].theme !== piece.theme)) {
    if (!checkTerrorOnPos(chessBoard, [row, col + 1], piece)) {
      pieceMoves.push([row, col + 1]);
    }
  }
  // Check downwards
  if (col !== 0 && (chessBoard[row][col - 1] === null || chessBoard[row][col - 1].theme !== piece.theme)) {
    if (!checkTerrorOnPos(chessBoard, [row, col - 1], piece)) {
      pieceMoves.push([row, col - 1]);
    }
  }
  // Check left
  if (row !== 0 && (chessBoard[row - 1][col] === null || chessBoard[row - 1][col].theme !== piece.theme)) {
    if (!checkTerrorOnPos(chessBoard, [row - 1, col], piece)) {
      pieceMoves.push([row - 1, col]);
    }
  }
  // Check right
  if (row !== 7 && (chessBoard[row + 1][col] === null || chessBoard[row + 1][col].theme !== piece.theme)) {
    if (!checkTerrorOnPos(chessBoard, [row + 1, col], piece)) {
      pieceMoves.push([row + 1, col]);
    }
  }
  // Check upper-right
  if (row !== 7 && col !== 7 && (chessBoard[row + 1][col + 1] === null || chessBoard[row + 1][col + 1].theme !== piece.theme)) {
    if (!checkTerrorOnPos(chessBoard, [row + 1, col + 1], piece)) {
      pieceMoves.push([row + 1, col + 1]);
    }
  }
  // Check upper-left
  if (row !== 0 && col !== 7 && (chessBoard[row - 1][col + 1] === null || chessBoard[row - 1][col + 1].theme !== piece.theme)) {
    if (!checkTerrorOnPos(chessBoard, [row - 1, col + 1], piece)) {
      pieceMoves.push([row - 1, col + 1]);
    }
  }
  // Check bottom-left
  if (row !== 7 && col !== 0 && (chessBoard[row + 1][col - 1] === null || chessBoard[row + 1][col - 1].theme !== piece.theme)) {
    if (!checkTerrorOnPos(chessBoard, [row + 1, col - 1], piece)) {
      pieceMoves.push([row + 1, col - 1]);
    }
  }
  // Check bottom-right
  if (row !== 0 && col !== 0 && (chessBoard[row - 1][col - 1] === null || chessBoard[row - 1][col - 1].theme !== piece.theme)) {
    if (!checkTerrorOnPos(chessBoard, [row - 1, col - 1], piece)) {
      pieceMoves.push([row - 1, col - 1]);
    }
  }

  return pieceMoves;
}
function getAllLShapeMoves(chessBoard, piece) {
  const pieceMoves = [];
  let row = piece.xPos;
  let col = piece.yPos;
  let tempRow, tempCol;


  // For column
  // Check upper-left L
  tempRow = row - 1;
  tempCol = col - 2;
  if (tempRow >= 0 && tempCol >= 0 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow][tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check upper-right L
  tempRow = row + 1;
  tempCol = col - 2;
  if (tempRow < 8 && tempCol >= 0 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow][tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check bottom-left L
  tempRow = row - 1;
  tempCol = col + 2;
  if (tempRow >= 0 && tempCol < 8 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow][tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check bottom-left L
  tempRow = row + 1;
  tempCol = col + 2;
  if (tempRow < 8 && tempCol < 8 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow][tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }

  // For Row
  // Check upper-left L
  tempRow = row - 2;
  tempCol = col - 1;
  if (tempRow >= 0 && tempCol >= 0 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow][tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check upper-right L
  tempRow = row - 2;
  tempCol = col + 1;
  if (tempRow >= 0 && tempCol < 8 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow][tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check bottom-left L
  tempRow = row + 2;
  tempCol = col - 1;
  if (tempRow < 8 && tempCol >= 0 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow][tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check bottom-left L
  tempRow = row + 2;
  tempCol = col + 1;
  if (tempRow < 8 && tempCol < 8 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow][tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  return pieceMoves;
}


const getPawnMoves = (chessBoard, piece) => {
  const pieceMoves = [];
  const row = piece.xPos;
  let col = piece.yPos;
  if (piece.theme === 'light') {
    if (col - 1 >= 0 && chessBoard[row][col - 1] === null) {
      pieceMoves.push([row, col - 1]);
      if (col - 2 >= 0 && chessBoard[row][col - 2] === null && chessBoard[row][col]?.firstMove === false) {
        pieceMoves.push([row, col - 2]);
      }
    }
    // Light Killing Moves
    if (col - 1 >= 0 && row + 1 < 8 && chessBoard[row + 1][col - 1] !== null && chessBoard[row + 1][col - 1]?.theme !== piece.theme) {
      pieceMoves.push([row + 1, col - 1]);
    }
    if (col - 1 >= 0 && row - 1 >= 0 && chessBoard[row - 1][col - 1] !== null && chessBoard[row - 1][col - 1]?.theme !== piece.theme) {
      pieceMoves.push([row - 1, col - 1]);
    }
  } else {
    if (col + 1 >= 0 && chessBoard[row][col + 1] === null) {
      pieceMoves.push([row, col + 1]);
      if (col + 2 >= 0 && chessBoard[row][col + 2] === null && chessBoard[row][col]?.firstMove === false) {
        pieceMoves.push([row, col + 2]);
      }
    }
    // Dark Killing Moves
    if (col + 1 < 8 && row + 1 < 8 && chessBoard[row + 1][col + 1] !== null && chessBoard[row + 1][col + 1]?.theme !== piece.theme) {
      pieceMoves.push([row + 1, col + 1]);
    }
    if (col + 1 < 8 && row - 1 >= 0 && chessBoard[row - 1][col + 1] !== null && chessBoard[row - 1][col + 1]?.theme !== piece.theme) {
      pieceMoves.push([row - 1, col + 1]);
    }
  }
  return pieceMoves;
}

// Sound Effects
export const clickSoundPlay = (type = false) => {
  if (true) {
    const audio = new Audio('/sounds/true-click-trimmed.wav');
    audio.play();
  }
}
export const pieceMoveSound = () => {
  const audio = new Audio('/sounds/piece-dies-trimmed-audio.mp3');
  audio.play();
}
export const pieceDieSound = () => {
  const audio = new Audio('/sounds/piece-move-audio.mp3');
  audio.play();
}
export const checkmateSound = () => {
  const audio = new Audio('/sounds/checkmate-audio.mp3');
  audio.play();
}
export const checkSound = () => {
  const audio = new Audio('/sounds/check-audio.mp3');
  audio.play();
}
export const playSound = (type, callBack) => {
  return;
  // switch (type) {
  //   case 1:
  //     pieceMoveSound();
  //     break;
  //   case 2:
  //     pieceDieSound();
  //     break;
  //   case 3:
  //     checkSound();
  //     break;
  //   case 4:
  //     checkmateSound();
  //     break;
  //   default:
  //     break;
  // }
  // if(callBack) callBack(0);
  // return;
}

const checkTerrorOnPos = (chessBoard, pos, king) => {
  for (const row of chessBoard) {
    for (const piece of row) {
      if (piece !== null && piece.theme !== king.theme) {
        const moves = piece.moves;
        if (piece.name === 'pawn') {

          // Terror by Dark Pawns
          if (piece.theme === 'dark' && king.theme === 'light') {
            const pawnMoves = [[piece.xPos + 1, piece.yPos + 1], [piece.xPos - 1, piece.yPos + 1]]
            if (checkContains(pawnMoves, pos)) {
              return true;
            }
          }
          // Terror by Light Pawns
          else if (piece.theme === 'light' && king.theme === 'dark') {
            const pawnMoves = [[piece.xPos + 1, piece.yPos - 1], [piece.xPos - 1, piece.yPos - 1]]
            if (checkContains(pawnMoves, pos)) {
              return true;
            }
          }
        } else if (checkContains(moves, pos)) {
          return true;
        }
      }
    }
  }
  return false;
}

const checkTerror = (king, chessBoard) => {
  for (let i = 0; i < chessBoard.length; i++) {
    for (let j = 0; j < chessBoard[i].length; j++) {
      if (chessBoard[i][j] !== null && chessBoard[i][j].theme !== king.theme) {
        const moves = chessBoard[i][j].moves;
        if (checkContains(moves, [king.xPos, king.yPos]))
          return true;
      }
    }
  }
  return false;
}
export function checkKingTerrorAndSelectMoves(chessBoard, setChessBoard, kings, setKings, pieceSound, setLightTerror, setDarkTerror) {
  chessBoard = refreshAllMoves(chessBoard);
  setChessBoard(chessBoard);
  let king = kings.lightKing;
  if (checkTerror(king, chessBoard)) {
    setLightTerror(`${king.xPos}-${king.yPos}`);
    pieceSound = 3;
  } else {
    setLightTerror(null)
  }
  king = kings.darkKing;
  if (checkTerror(king, chessBoard)) {
    setDarkTerror(`${king.xPos}-${king.yPos}`);
    pieceSound = 3;
  } else {
    setDarkTerror(null)
  }
  if (pieceSound === 3) playSound(pieceSound, (val)=> {});
}
export const checkIfSetsTerrorToKing = (pos, givenChessBoard, kings, givenPiece) => {
  const piece = JSON.parse(JSON.stringify(givenPiece));
  const chessBoard = JSON.parse(JSON.stringify(givenChessBoard));
  let answer = false;
  const givenKing = piece.theme === 'light' ? kings.lightKing : kings.darkKing;
  let king = JSON.parse(JSON.stringify(givenKing));
  const moves = getMoves(chessBoard, piece);
  if (checkContains(moves, pos)) {
    chessBoard[piece.xPos][piece.yPos] = null;
    piece.xPos = pos[0];
    piece.yPos = pos[1];
    piece.moves = getMoves(chessBoard, piece);
    if (piece.name === 'king') {
      king = piece;
    }
    chessBoard[pos[0]][pos[1]] = piece;
    let newChessBoard = refreshAllMoves(chessBoard);
    answer = checkTerror(king, newChessBoard);
  }
  return answer;
}
const checkEveryMoveTerror = (givenPiece, chessBoard, king) => {
  let piece = JSON.parse(JSON.stringify(givenPiece));
  const moves = piece.moves;
  for (const move of moves) {
    let newChessBoard = JSON.parse(JSON.stringify(chessBoard));
    newChessBoard[piece.xPos][piece.yPos] = null;
    piece.xPos = move[0];
    piece.yPos = move[1];
    newChessBoard[move[0]][move[1]] = piece;
    if (piece.name === 'king') {
      king = piece;
    }
    newChessBoard = refreshAllMoves(newChessBoard);
    if (!checkTerror(king, newChessBoard)) {
      return false;
    }
  }
  return true;
}
export const isCheckMate = (chessBoard, king) => {
  let checkMate = true;
  for (let row in chessBoard) {
    for (let col in chessBoard[row]) {
      if (chessBoard[row][col] !== null && chessBoard[row][col].theme === king.theme) {
        const piece = chessBoard[row][col];
        if (piece && piece.theme === king.theme) {
          if (checkEveryMoveTerror(piece, chessBoard, king)) {
            continue;
          } else {
            checkMate = false;
            break;
          }
        }
      }
    }
  }
  return checkMate;
}
export const changePiece = (piece, name) => {
  let newPiece = JSON.parse(JSON.stringify(piece));
  switch (name) {
    case 'rook':
      newPiece.name = 'rook';
      newPiece.component = <FaChessRook className={piece.theme} />
      break;
    case 'knight':
      newPiece.name = 'knight';
      newPiece.component = <FaChessKnight className={piece.theme} />
      break;
    case 'queen':
      newPiece.name = 'queen';
      newPiece.component = <FaChessQueen className={piece.theme} />
      break;
    case 'bishop':
      newPiece.name = 'bishop';
      newPiece.component = <FaChessBishop className={piece.theme} />
      break;
    default:
      break;
  }
  return newPiece;
}
// 1- Check King terror ----> Done
// 2- Check King moves restrictions ----> Done
// 3- Calculate King moves ----> Done
// 4- Calculate Defense of king by moves ----> Done
// 8- Promotion of Pawn ----> Done
// 9- Calculate Defense of king by other pieces ----> Done
// 10- If moves are zero and there are no other options then checkmate ----> Done

// 5- Game Draw calculations ----> Pending...
// 6- Castling ----> Pending...
// 7- En Passe ----> Pending...




// 1 Create an Array of all moves of every piece except pawn
// 2 Check before moving that piece that it doesn't endanger the King
// 3 If a king stays in danger then move is disabled
// 4 If all possible moves == 0 then it is checkMate
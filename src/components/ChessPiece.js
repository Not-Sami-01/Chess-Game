import { FaChessBishop, FaChessKing, FaChessKnight, FaChessPawn, FaChessQueen, FaChessRook } from "react-icons/fa";
export const getMoves = (chessBoard, piece) => {
  switch (piece.name) {
    // Moves for Rook
    case 'rook':
      return getAllStraightMoves(chessBoard, piece);

    // Moves for Bishop
    case 'bishop':
      return getAllDiagonalMoves(chessBoard, piece);
    case 'queen':
      return [...getAllStraightMoves(chessBoard, piece), ...getAllDiagonalMoves(chessBoard, piece)];
    case 'king':
      return getBoxMoves(chessBoard, piece);
    case 'knight':
      return getAllLShapeMoves(chessBoard, piece);
    case 'pawn':
      return getPawnMoves(chessBoard, piece);
    default:
      return [];
  }
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
        break;
      } else {
        chessBoard[i][j].moves = getMoves(chessBoard, chessBoard[i][j]);
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
      theme: 'dark'
    },
    {
      // Right Rook
      name: 'rook',
      xPos: 7,
      yPos: 0,
      moves: [],
      component: <FaChessRook className="dark" />,
      theme: 'dark',
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
    },
    {
      // Right Rook
      name: 'rook',
      xPos: 7,
      yPos: 7,
      moves: [],
      component: <FaChessRook className="light" />,
      theme: 'light',
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
    },
    {
      // Right Bishop
      name: 'bishop',
      xPos: 5,
      yPos: 0,
      moves: [],
      component: <FaChessBishop className="dark" />,
      theme: 'dark',
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
    },
    {
      // Right Bishop
      name: 'bishop',
      xPos: 5,
      yPos: 7,
      moves: [],
      component: <FaChessBishop className="light" />,
      theme: 'light',
    },
    // Dark Queen
    {
      name: 'queen',
      xPos: 3,
      yPos: 0,
      moves: [],
      component: <FaChessQueen className="dark" />,
      theme: 'dark',
    },
    // Light Queen
    {
      name: 'queen',
      xPos: 3,
      yPos: 7,
      moves: [],
      component: <FaChessQueen className="light" />,
      theme: 'light',
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
    piece.moves = getMoves(chessBoard, piece);
    chessBoard[piece.xPos][piece.yPos] = piece;
  }
  const darkKing = chessBoard[4][0];
  const lightKing = chessBoard[4][7];
  callBack([...chessBoard]);
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
        pieceMoves.push([row, col]);n
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
export const playSound = (type) => {
  switch (type) {
    case 1:
      pieceMoveSound();
      break;
    case 2:
      pieceDieSound();
      break;
    case 3:
      checkSound();
      break;
    case 4:
      checkmateSound();
      break;
    default:
      break;
  }
  return;
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
        // console.log(checkContains(moves, [king.xPos, king.yPos]))
        if (checkContains(moves, [king.xPos, king.yPos]))
          return true;
      }
    }
  }
  return false;
}
export function checkKingTerrorAndSelectMoves(chessBoard, kings, setKings, pieceSound, setLightTerror, setDarkTerror) {
  chessBoard = refreshAllMoves(chessBoard);
  let king = kings.lightKing;
  if (checkTerror(king, chessBoard)) {
    setLightTerror(`${king.xPos}-${king.yPos}`);
    pieceSound = 3;
    // setKingMoves
  } else {
    // console.log('No Terror')
    setLightTerror(null)
  }
  king = kings.darkKing;
  if (checkTerror(king, chessBoard)) {
    setDarkTerror(`${king.xPos}-${king.yPos}`);
    pieceSound = 3;
    // setKingMoves
  } else {
    // console.log('No Terror')
    setDarkTerror(null)
  }
  playSound(pieceSound);
}

// 1- Check King terror ----> Done
// 2- Check King moves restrictions ----> Done
// 3- Calculate King moves ----> Done
// 4- Calculate Defense of king by moves ----> Done

// 5- Game Draw calculations ----> Pending...
// 6- Castling ----> Pending...
// 7- En Passe ----> Pending...
// 8- Promotion of Pawn ----> Pending...
// 9- Calculate Defense of king by other pieces ----> Pending...
// 10- If moves are zero and there are no other options then checkmate ----> Pending...
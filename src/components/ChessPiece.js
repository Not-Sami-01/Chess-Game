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
      return -1;
  }
}

export const checkContains = (moves, pos) => {
  for (let i in moves) {
    if (moves[i][0] === pos[0] && moves[i][1] === pos[1]) {
      return true;
    }
  }
}
export const refreshAllMoves = (chessBoard) => {
  for (let i in chessBoard) {
    for (let j in chessBoard[i]) {
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
    },
    // Light King
    {
      name: 'king',
      xPos: 4,
      yPos: 7,
      moves: [],
      component: <FaChessKing className="light" />,
      theme: 'light',
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
  callBack([...chessBoard]);
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
    pieceMoves.push([row, col + 1]);
  }
  // Check downwards
  if (col !== 0 && (chessBoard[row][col - 1] === null || chessBoard[row][col - 1].theme !== piece.theme)) {
    pieceMoves.push([row, col - 1]);
  }
  // Check left
  if (row !== 0 && (chessBoard[row - 1][col] === null || chessBoard[row - 1][col].theme !== piece.theme)) {
    pieceMoves.push([row - 1, col]);
  }
  // Check right
  if (row !== 7 && (chessBoard[row + 1][col] === null || chessBoard[row + 1][col].theme !== piece.theme)) {
    pieceMoves.push([row + 1, col]);
  }
  // Check upper-right
  if (row !== 7 && col !== 7 && (chessBoard[row + 1][col + 1] === null || chessBoard[row + 1][col + 1].theme !== piece.theme)) {
    pieceMoves.push([row + 1, col + 1]);
  }
  // Check upper-left
  if (row !== 0 && col !== 7 && (chessBoard[row - 1][col + 1] === null || chessBoard[row - 1][col + 1].theme !== piece.theme)) {
    pieceMoves.push([row - 1, col + 1]);
  }
  // Check bottom-left
  if (row !== 7 && col !== 0 && (chessBoard[row + 1][col - 1] === null || chessBoard[row + 1][col - 1].theme !== piece.theme)) {
    pieceMoves.push([row + 1, col - 1]);
  }
  // Check bottom-right
  if (row !== 0 && col !== 0 && (chessBoard[row - 1][col - 1] === null || chessBoard[row - 1][col - 1].theme !== piece.theme)) {
    pieceMoves.push([row - 1, col - 1]);
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
  if (tempRow >= 0 && tempCol >= 0 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow, tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check upper-right L
  tempRow = row + 1;
  tempCol = col - 2;
  if (tempRow < 8 && tempCol >= 0 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow, tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check bottom-left L
  tempRow = row - 1;
  tempCol = col + 2;
  if (tempRow >= 0 && tempCol < 8 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow, tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check bottom-left L
  tempRow = row + 1;
  tempCol = col + 2;
  if (tempRow < 8 && tempCol < 8 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow, tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }

  // For Row
  // Check upper-left L
  tempRow = row - 2;
  tempCol = col - 1;
  if (tempRow >= 0 && tempCol >= 0 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow, tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check upper-right L
  tempRow = row - 2;
  tempCol = col + 1;
  if (tempRow >= 0 && tempCol < 8 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow, tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check bottom-left L
  tempRow = row + 2;
  tempCol = col - 1;
  if (tempRow < 8 && tempCol >= 0 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow, tempCol].theme !== piece.theme)) {
    pieceMoves.push([tempRow, tempCol]);
  }
  // Check bottom-left L
  tempRow = row + 2;
  tempCol = col + 1;
  if (tempRow < 8 && tempCol < 8 && (chessBoard[tempRow][tempCol] === null || !chessBoard[tempRow, tempCol].theme !== piece.theme)) {
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
    if (col - 1 >= 0 && row + 1 < 8 && chessBoard[row + 1][col - 1] !== null && chessBoard[row + 1][col - 1]?.theme !== piece.theme) {
      pieceMoves.push([row + 1, col - 1]);
    }
    if (col - 1 >= 0 && row - 1 >= 0 && chessBoard[row - 1][col - 1] !== null && chessBoard[row - 1][col - 1]?.theme !== piece.theme) {
      pieceMoves.push([row + 1, col - 1]);
    }
  } else {
    if (col + 1 >= 0 && chessBoard[row][col + 1] === null) {
      pieceMoves.push([row, col + 1]);
      if (col + 2 >= 0  &&chessBoard[row][col + 2] === null && chessBoard[row][col]?.firstMove === false) {
        pieceMoves.push([row, col + 2]);
      }
    }
    if (col + 1 < 8 && row + 1 < 8 && chessBoard[row + 1][col + 1] !== null && chessBoard[row + 1][col + 1]?.theme !== piece.theme) {
      pieceMoves.push([row + 1, col + 1]);
    }
    if (col + 1 < 8 && row - 1 >= 0 && chessBoard[row - 1][col + 1] !== null && chessBoard[row - 1][col + 1]?.theme !== piece.theme) {
      pieceMoves.push([row - 1, col + 1]);
    }
  }
  return pieceMoves;
}
export function checkKingMoves(chessBoard, theme) {
  const king = chessBoard.flatMap(row => row).find(col => col?.name === 'king' && col?.theme == theme);
  const moves = getBoxMoves(chessBoard, king);
}
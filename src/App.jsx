import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import { clickSoundPlay, isCheckMate, setUpChessBoard } from './components/ChessPiece';
import { FaBars } from 'react-icons/fa';
function App() {

  const [lightDeadPieces, setLightDeadPieces] = useState([]);
  const [kings, setKings] = useState({});
  const [darkDeadPieces, setDarkDeadPieces] = useState([]);
  const [turn, setTurn] = useState(true);
  const [inverseAnimation, setInverseAnimation] = useState(false);
  const [rotateBoard, setRotateBoard] = useState(false);
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [lightTerror, setLightTerror] = useState(null);
  const [darkTerror, setDarkTerror] = useState(null);
  const [disableChessboard, setDisableChessboard] = useState(false);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [posToMove, setPosToMove] = useState([]);


  const ref = useRef();
  const firstLetterUpperCase = (str) => {
    const modStr = str[0].toUpperCase() + str.slice(1);
    return modStr;
  }
  const checkMate = useCallback((theme)=>{
    setGameOverModal(true);
    setGameOverMessage(firstLetterUpperCase(theme) + " won by CheckMate");
    setDisableChessboard(true);
  }, [])
  const gameOver = data => {
    setGameOverMessage(data.message);
    setGameOverModal(true);
  }

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
  const [chessBoard, setChessBoard] = useState(getChessboardArray());


  const resetChessBoard = () => {
    setDisableChessboard(false);
    clickSoundPlay();
    const board = getChessboardArray();
    setTurn(true);
    const kingPieces = setUpChessBoard(board, setChessBoard);
    setKings(kingPieces);
    setLightDeadPieces([]);
    setDarkDeadPieces([]);
    setLightTerror(null);
    setDarkTerror(null);
    setPosToMove([]);
    setGameOverModal(false);
    setDisableChessboard(false);
  }


  const clearChessBoard = () => {
    clickSoundPlay();
    const board = getChessboardArray();
    setChessBoard(board);
    setLightDeadPieces([]);
    setDarkDeadPieces([]);
    setLightTerror(null);
    setDarkTerror(null);
    setPosToMove([]);
  }
  useEffect(() => {
    if (rotateBoard) {
      setInverseAnimation(false);
    }
  }, [rotateBoard])

  useEffect(() => {
    if (inverseAnimation) {
      setRotateBoard(false);
    }
  }, [inverseAnimation])

  useEffect(() => {
    if (kings.length > 0) {
      const tempChessBoard = chessBoard;
      tempChessBoard[kings.lightKing.xPos][kings.lightKing.yPos] = kings.lightKing;
      setChessBoard(tempChessBoard);
    }
  }, [kings.lightKing, chessBoard, kings.length])

  useEffect(() => {
    if (kings.length > 0) {
      const tempChessBoard = chessBoard;
      tempChessBoard[kings.darkKing.xPos][kings.darkKing.yPos] = kings.darkKing;
      setChessBoard(tempChessBoard);
    }
  }, [kings.darkKing, chessBoard, kings.length])

  useEffect(() => {
    if (navbarCollapse) {
      ref.current.style.height = '180px';
    } else {
      ref.current.style.height = '0%';
    }
  }, [navbarCollapse])
  useEffect(() => {
    if (lightTerror && isCheckMate(chessBoard, kings.lightKing)) checkMate('dark');
  }, [lightTerror, checkMate, chessBoard, kings.lightKing])

  useEffect(() => {
    if (darkTerror && isCheckMate(chessBoard, kings.darkKing)) checkMate('light');
  }, [darkTerror, checkMate, chessBoard, kings.darkKing])
  return (
    <>
      <header className="main-header bg-primary shadow-md py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* You can add a logo here if you want */}
          <h1 className='text-primary nav-text text-white font-bold text-2xl'>Chess Game</h1>
        </div>
        <span onClick={() => setNavbarCollapse(!navbarCollapse)} className="md-flex nav-menu d-none text-white text-2xl cursor-pointer">
          <FaBars />
        </span>
        <ul ref={ref} className={`navbar flex gap-2 transition-all duration-300`}>
          {/* <li onClick={clickSoundPlay}><button>Home</button></li> */}
          {/* <li onClick={clickSoundPlay}><button>About</button></li> */}
          <li className={rotateBoard ? 'nav-link-full-color' : ''} onClick={() => { setRotateBoard(!rotateBoard); clickSoundPlay(rotateBoard) }}><button>Rotate Board</button></li>
          <li onClick={resetChessBoard}><button>Restart/Play Game</button></li>
          <li onClick={clearChessBoard}><button>End Game</button></li>
          <li className={inverseAnimation ? 'nav-link-full-color' : ''} onClick={() => { setInverseAnimation(!inverseAnimation); clickSoundPlay(inverseAnimation) }}><button>Inverse Animation</button></li>
        </ul>
      </header>
      <main className="main-content flex flex-col items-center justify-center min-h-[70vh] py-8 bg-light">
        <div className="chessboard-container bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
          <ChessBoard
            chessBoard={chessBoard}
            setChessBoard={setChessBoard}
            lightDeadPieces={lightDeadPieces}
            setLightDeadPieces={setLightDeadPieces}
            darkDeadPieces={darkDeadPieces}
            setDarkDeadPieces={setDarkDeadPieces}
            turn={turn}
            setTurn={setTurn}
            inverseAnimation={inverseAnimation}
            rotateBoard={rotateBoard}
            kings={kings}
            setKings={setKings}
            lightTerror={lightTerror}
            setLightTerror={setLightTerror}
            darkTerror={darkTerror}
            setDarkTerror={setDarkTerror}
            disableChessboard={disableChessboard}
            setDisableChessboard={setDisableChessboard}
            gameOverModal={gameOverModal}
            setGameOverModal={setGameOverModal}
            resetChessBoard={resetChessBoard}
            gameOverMessage={gameOverMessage}
            setGameOverMessage={setGameOverMessage}
            gameOver={gameOver}
            posToMove={posToMove}
            setPosToMove={setPosToMove}
          />
        </div>
      </main>
      <footer className='footer bg-primary px-4 py-6 flex flex-col items-center'>
        <div className="credit flex flex-col items-center gap-2">
          <span className="text-white text-lg font-semibold">Made by: Sami Ul Rehman</span>
          <div className="flex gap-4 mt-1">
            <a href="https://github.com/not-sami-01" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="GitHub">
              {/* GitHub SVG icon */}
              <svg width="24" height="24" fill="currentColor" className="text-white" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/sami-ur-rehman-safdar-98271b334/" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="LinkedIn">
              {/* LinkedIn SVG icon */}
              <svg width="24" height="24" fill="currentColor" className="text-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z"/></svg>
            </a>
          </div>
        </div>
        <p className='text-white text-center mt-4'>&copy; 2021 Chess Game. All rights reserved</p>
      </footer>
    </>
  );
}

export default App;
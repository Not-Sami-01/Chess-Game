import { useEffect, useRef, useState } from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import { clickSoundPlay, isCheckMate, setUpChessBoard } from './components/ChessPiece';
import { FaBars } from 'react-icons/fa';
import $ from 'jquery';
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
  const [disableChessboard, setDisabledChessboard] = useState(false);
  const [gameOverModal, setGameOverModal] = useState(true);
  const [gameOverMessage, setGameOverMessage] = useState('');

  const ref = useRef();
  const firstLetterUpperCase = (str) => {
    const modStr = str[0].toUpperCase() + str.slice(1);
    return modStr;
  }
  const checkMate = theme => {
    setGameOverModal(true);
    setGameOverMessage(firstLetterUpperCase(theme) + " won by CheckMate");
    setDisabledChessboard(true);
  }
  const gameOver = data => {

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
    setDisabledChessboard(false);
    clickSoundPlay();
    const board = getChessboardArray();
    setTurn(true);
    const kingPieces = setUpChessBoard(board, setChessBoard);
    setKings(kingPieces);
    setLightDeadPieces([]);
    setDarkDeadPieces([]);
    setLightTerror(null);
    setDarkTerror(null);
  }


  const clearChessBoard = () => {
    clickSoundPlay();
    const board = getChessboardArray();
    setChessBoard(board);
    setLightDeadPieces([]);
    setDarkDeadPieces([]);
    setLightTerror(null);
    setDarkTerror(null);
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
  }, [kings.lightKing])

  useEffect(() => {
    if (kings.length > 0) {
      const tempChessBoard = chessBoard;
      tempChessBoard[kings.darkKing.xPos][kings.darkKing.yPos] = kings.darkKing;
      setChessBoard(tempChessBoard);
    }
  }, [kings.darkKing])

  useEffect(() => {
    if (navbarCollapse) {
      ref.current.style.height = '180px';
    } else {
      ref.current.style.height = '0%';
    }
  }, [navbarCollapse])

  useEffect(() => {
    if (lightTerror) {
      isCheckMate(chessBoard, kings.lightKing) && checkMate('dark');
    }
  }, [lightTerror])

  useEffect(() => {
    if (darkTerror) {
      isCheckMate(chessBoard, kings.darkKing) && checkMate('light');
    }
  }, [darkTerror])
  return (
    <>
      <header>
        <nav className='flex items-center justify-between'>
          <h1 className='text-primary nav-text'>Chess Game</h1>
          <span onClick={() => setNavbarCollapse(!navbarCollapse)} className="md-flex nav-menu d-none">
            <FaBars />
          </span>
          <ul ref={ref} className={`navbar flex`}>
            <li onClick={clickSoundPlay}><button>Home</button><span /></li>
            <li onClick={clickSoundPlay}><button>About</button><span /></li>
            <li className={rotateBoard ? 'nav-link-full-color' : ''} onClick={() => { setRotateBoard(!rotateBoard); clickSoundPlay(rotateBoard) }}><button>Rotate Board</button><span /></li>
            <li onClick={resetChessBoard}><button>Restart/Play Game</button><span /></li>
            <li onClick={clearChessBoard}><button>End Game</button><span /></li>
            <li className={inverseAnimation ? 'nav-link-full-color' : ''} onClick={() => { setInverseAnimation(!inverseAnimation); clickSoundPlay(inverseAnimation) }}><button>Inverse Animation</button><span /></li>
          </ul>
        </nav>
      </header>
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
        setDisabledChessboard={setDisabledChessboard}
        gameOverModal={gameOverModal}
        setGameOverModal={setGameOverModal}
        resetChessBoard={resetChessBoard}
      />
      <footer className='bg-primary px-3 py-4'>
        <div className="w-max links justify-between flex flex-col">

          <ul className="style-none">
            <h4 className='text-white'>Other Links</h4>
            <li className='text-black px-2' >Link 1 </li>
            <li className='text-black px-2' >Link 2 </li>
            <li className='text-black px-2' >Link 3 </li>
            <li className='text-black px-2' >Link 4 </li>
          </ul>
          <ul className="style-none">
            <h4 className='text-white'>Other Links</h4>
            <li className='text-black px-2' >Link 1 </li>
            <li className='text-black px-2' >Link 2 </li>
            <li className='text-black px-2' >Link 3 </li>
            <li className='text-black px-2' >Link 4 </li>
          </ul>
          <ul className="style-none">
            <h4 className='text-white'>Other Links</h4>
            <li className='text-black px-2' >Link 1 </li>
            <li className='text-black px-2' >Link 2 </li>
            <li className='text-black px-2' >Link 3 </li>
            <li className='text-black px-2' >Link 4 </li>
          </ul>
        </div>
      </footer>
      <div className="other py-3 w-full bg-forth">
        <p className='text-black text-center'>&copy; 2021 Chess Game. All rights reserved</p>
      </div>
    </>
  );
}

export default App;
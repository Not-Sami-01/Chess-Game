import { useEffect, useState } from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import { clickSoundPlay, setUpChessBoard } from './components/ChessPiece';
import { FaChessKing } from 'react-icons/fa';

function App() {

  const [lightDeadPieces, setLightDeadPieces] = useState([]);
  const [kings, setKings] = useState({});
  const [darkDeadPieces, setDarkDeadPieces] = useState([]);
  const [turn, setTurn] = useState(true);
  const [inverseAnimation, setInverseAnimation] = useState(false);
  const [rotateBoard, setRotateBoard] = useState(false);
  
  
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
    clickSoundPlay();
    const board = getChessboardArray();
    setTurn(true);
    const kingPieces = setUpChessBoard(board, setChessBoard);
    setKings(kingPieces);
    setLightDeadPieces([]);
    setDarkDeadPieces([]);
  }


  const clearChessBoard = () => {
    clickSoundPlay();
    const board = getChessboardArray();
    setChessBoard(board)
  }
  useEffect(()=> {
    if(rotateBoard){
      setInverseAnimation(false);
    }
  }, [rotateBoard])
  useEffect(()=> {
    if(inverseAnimation){
      setRotateBoard(false);
    }
  }, [inverseAnimation])
  useEffect(()=> {
    if(kings.length > 0){
      const tempChessBoard = chessBoard;
      tempChessBoard[kings.lightKing.xPos][kings.lightKing.yPos] = kings.lightKing;
      setChessBoard(tempChessBoard);
    }
  }, [kings.lightKing])
  useEffect(()=> {
    if(kings.length > 0){
      const tempChessBoard = chessBoard;
      tempChessBoard[kings.darkKing.xPos][kings.darkKing.yPos] = kings.darkKing;
      setChessBoard(tempChessBoard);
    }
  }, [kings.darkKing])

  return (
    <>
      <header>
        <nav className='flex items-center justify-between'>
          <h1 className='text-primary nav-text'>Chess Game</h1>
          <ul className='navbar flex'>
            <li onClick={clickSoundPlay}>Home<span/></li>
            <li onClick={clickSoundPlay}>About<span/></li>
            <li className={rotateBoard ? 'nav-link-full-color' :''} onClick={()=>{setRotateBoard(!rotateBoard); clickSoundPlay(rotateBoard)}}>Rotate Board<span/></li>
            <li onClick={resetChessBoard}>Restart/Play Game<span/></li>
            <li onClick={clearChessBoard}>End Game<span/></li>
            <li className={inverseAnimation ? 'nav-link-full-color' :''} onClick={()=> {setInverseAnimation(!inverseAnimation); clickSoundPlay(inverseAnimation)}}>Inverse Animation<span/></li>
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
      />
      <footer className='bg-primary px-3 py-4'>
        <div className="links justify-between flex">

      <ul className="style-none">
        <h4>Other Links</h4>
        <li className='text-muted px-1' >Link 1 </li>
        <li className='text-muted px-1' >Link 2 </li>
        <li className='text-muted px-1' >Link 3 </li>
        <li className='text-muted px-1' >Link 4 </li>
      </ul>
      <ul className="style-none">
        <h4>Other Links</h4>
        <li className='text-muted px-1' >Link 1 </li>
        <li className='text-muted px-1' >Link 2 </li>
        <li className='text-muted px-1' >Link 3 </li>
        <li className='text-muted px-1' >Link 4 </li>
      </ul>
      <ul className="style-none">
        <h4>Other Links</h4>
        <li className='text-muted px-1' >Link 1 </li>
        <li className='text-muted px-1' >Link 2 </li>
        <li className='text-muted px-1' >Link 3 </li>
        <li className='text-muted px-1' >Link 4 </li>
      </ul>
        </div>
      <div className="other py-3">
        <p className='text-muted text-center'>&copy; 2021 Chess Game. All rights reserved</p>
      </div>
      </footer>
    </>
  );
}

export default App;
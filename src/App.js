import { useState } from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';

function App() {
  return (
    <>
      <header>
        <nav className='flex items-center justify-between'>
          <h1 className='text-primary'>Chess Game</h1>
          <ul className='navbar flex'>
            <li>Home<span/></li>
            <li>About<span/></li>
            <li>Restart/Play Game<span/></li>
            <li>New Game<span/></li>
            <li>End Game<span/></li>
          </ul>
        </nav>
      </header>
      <ChessBoard/>
      <footer className='bg-primary px-3 py-4'>
        {/* <h4>Other Links</h4> */}
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

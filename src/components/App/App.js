import React from 'react';
import useSound from 'use-sound';
import start from '../../1.mp3';
import finish from '../../2.mp3';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

const restTime = 10;
const workTime = 60;

function App() {

  const [lap, setLap] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // const [audio, setAudio] = useState(null);
  const [timer, setTimer] = useState(0);

  const [isRestTime, setIsRestTime] = useState(true);

  const [play] = useSound(finish);


  function incr() {
    setLap(p => p + 1);
    clearInterval(timer);
    setSeconds(0);
    play();
  }

  useEffect(() => {
    if (lap) {
      const time = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
      setTimer(time);
      setIsRestTime(!isRestTime);
    }
  }, [lap]);

  useEffect(() => {
    if (seconds === (isRestTime ? restTime : workTime)) {

      setSeconds(0);
      clearInterval(timer);
      incr();

      // audio.play();
    }
  }, [seconds])


  return (
    <div className="App">
      <h1>СЕКУНДОМЕР ДЛЯ ПЛАНКИ НА СПИНУ</h1>

      <h1 className="title center-text">
        {isRestTime ? 'REST' : 'WORK'}
      </h1>
      <h2 className="subtitle center-text">{seconds}</h2>
      <h2 className="subtitle lap">{lap}</h2>

      <button className='btn' onClick={incr}>
        LAP
      </button>

    </div>
  );
}

export default App;

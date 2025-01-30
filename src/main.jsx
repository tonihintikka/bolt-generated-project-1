import { useState, useEffect } from 'react';
import { Bell, PlayCircle, StopCircle } from 'react-icons/all';

export default function PomodoroTimer() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1000) {
            setCompletedPomodoros(prevCount => prevCount + 1);
            return 25 * 60; // Reset to 25 minutes
          }
          return prevTime - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => {
    if (timeLeft <= 1000) {
      setCompletedPomodoros(prevCount => prevCount + 1);
    }
    setIsActive(!isActive);
    setTimeLeft(isActive ? 25 * 60 : timeLeft); // Reset timer when starting
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Pomodoro Timer</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-6xl font-bold text-blue-600 mb-6">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        
        <button
          onClick={toggleTimer}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform ${isActive ? 'bg-red-500 hover:scale-95' : 'bg-green-500 hover:scale-95'} text-white`}
        >
          {isActive ? (
            <StopCircle className="w-8 h-8" />
          ) : (
            <PlayCircle className="w-8 h-8" />
          )}
        </button>

        <div className="mt-6 text-gray-600">
          Completed Pomodoros: {' '}
          <span className="font-bold">{completedPomodoros}</span>
        </div>
      </div>
    </div>
  );
}

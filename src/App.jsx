import { useState, useEffect } from 'react';

const options = [
  { id: 0, name: 'Stone', emoji: '✊', beats: [2, 3] },
  { id: 1, name: 'Paper', emoji: '✋', beats: [0] },
  { id: 2, name: 'Scissor', emoji: '✌️', beats: [1, 3]},
  { id: 3, name: 'Alligator', emoji: '🐊', beats: [1]},
  { id: 4, name: 'Spock', emoji: '🖖', beats: [3, 0]}
];

const getResult = (userChange, computerChange) => {
  if (userChange === computerChange) return 0;
  if (options[userChange].beats.includes(computerChange)) return 1;

  return 2;
};

function OptionButton({ option, handlePlay, disabled }) {
  return(
    <button className='px-4 py-2 m-2 text-xl font-bold text-white bg-gray-500 hover:bg-gray-700 rounded-full' disabled={disabled} onClick={() => handlePlay(option.id)} title={option.name}>{option.emoji}</button>
  )
};

function useChanges() {
  const [userChange, setUserChange] = useState(null);
  const [computerChange, setComputerChange] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (userChange !== null) {
      setUserMessage(`You have chosen ${options[userChange]?.emoji} - ${options[userChange]?.name}`);
    }
  }, [userChange]);
  
  useEffect(() => {
    if (computerChange !== null) {
      setComputerMessage(`The computer chosen ${options[computerChange]?.emoji} - ${options[computerChange]?.name}`);
    }
  }, [computerChange]);

  const handlePlay = (change) => {
    setUserChange(change);
    setDisabled(true);
    const randomChange = Math.floor(Math.random() * 5);

    setTimeout(() => {
      setComputerChange(randomChange);
    }, 1000);

    setTimeout(() => {
      setResult(getResult(change, randomChange));
    }, 1500);

    clearTimeout();
  };

  const reset = () => {
    setUserChange(null);
    setComputerChange(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
  };
  
  return { userChange, computerChange, userMessage, computerMessage, result, disabled, handlePlay, reset };
}

function App() {
  const { userChange, computerChange, userMessage, computerMessage, result, disabled, handlePlay, reset } = useChanges();

  return (
    <div className='flex items-center justify-center h-screen bg-black'>
      <div className='rounded-lg p-8 bg-gray-800'>
        <h1 className='text-3xl mb-4 text-center font-bold text-blue-500 italic font-mono'>Play Game - Big Bang Theory</h1>
        <div className='max-w-md mx-auto flex justify-center'>
          {
            options.map((option) => (
              <OptionButton key={option.id} option={option} disabled={disabled} handlePlay={handlePlay}>
                {option.emoji}
              </OptionButton>
            ))
          }
        </div>
        <div className='max-w-md mx-auto flex flex-col text-white italic'>
          {
            userChange !== null && (<p className='text-xl mt-4'>{userMessage}</p>)
          }
          {
            computerChange !== null && (<p className='text-xl mt-4'>{computerMessage}</p>)
          }
          {
            result === 0 && <p className='text-xl mt-4'>🤷‍♂️ You have tie the computer.</p>
          }
          {
            result === 1 && (<p className='text-xl mt-4'>✅ You win! {options[userChange]?.name} vs. {options[computerChange]?.name}</p>)
          }
          {
            result === 2 && (<p className='text-xl mt-4'>❎ You lose! {options[userChange]?.name} vs. {options[computerChange]?.name}</p>)
          }
          <button onClick={reset} className='bg-red-500 hover:bg-red-700 text-black mt-8 rounded-lg font-bold'>RETRY</button>
        </div>
      </div>
    </div>
  )
}

export default App;

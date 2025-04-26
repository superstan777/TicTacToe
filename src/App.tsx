import { useEffect, useState } from "react";
import { Tile } from "./components/Tile";
import "./App.css";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [tilesHistory, setTilesHistory] = useState<number[]>([]);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const endTurn = () => {
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayer(nextPlayer);
  };

  const handleClick = (index: number) => {
    if (board[index]) return;

    const newBoard = [...board];

    if (tilesHistory.length >= 6) {
      const indexToDelete = tilesHistory[0];
      newBoard[indexToDelete] = null;
    }

    newBoard[index] = currentPlayer === 1 ? "O" : "X";
    setBoard(newBoard);

    setTilesHistory((prev) => [...prev.slice(-5), index]);

    endTurn();
  };

  useEffect(() => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a] === "O" ? 1 : 2);
        break;
      }
    }
  }, [board]);

  const renderHeader = () => {
    if (winner !== null) {
      const playerColor = winner === 1 ? "text-blue-500" : "text-red-500";
      const playerLabel = winner === 1 ? "Blue" : "Red";

      return (
        <p className={`mb-4 text-xl ${playerColor}`}>{playerLabel} wins!</p>
      );
    }

    const playerColor = currentPlayer === 1 ? "text-blue-500" : "text-red-500";
    const playerLabel = currentPlayer === 1 ? "Blue" : "Red";

    return (
      <p className={`mb-4 text-xl ${playerColor}`}>{playerLabel}'s turn</p>
    );
  };

  const playAgain = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(1);
    setTilesHistory([]);
  };

  return (
    <div className="select-none">
      {renderHeader()}
      <div className="relative ">
        {winner && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in  ">
            <button className="bg-green-500 text-white" onClick={playAgain}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="48"
                height="48"
                strokeWidth="2.5"
              >
                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
              </svg>
            </button>
          </div>
        )}
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          {board.map((value, i) => (
            <Tile
              key={i}
              index={i}
              value={value}
              onClick={() => handleClick(i)}
              winner={winner}
              tilesHistory={tilesHistory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

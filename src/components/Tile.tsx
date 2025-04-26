import React from "react";

interface Props {
  value: null | "X" | "O";
  index: number;
  onClick: () => void;
  tilesHistory: number[];
  winner: 1 | 2 | null;
}

export const Tile: React.FC<Props> = ({
  value,
  onClick,
  winner,
  tilesHistory,
  index,
}) => {
  const renderStyles = () => {
    if (!value) return "";

    const isOldest = tilesHistory[0] === index && tilesHistory.length === 6;

    if (winner) {
      return value === "X" ? "text-red-500" : "text-blue-500";
    }

    if (value === "X") {
      return isOldest ? "text-red-200" : "text-red-500";
    }

    return isOldest ? "text-blue-200" : "text-blue-500";
  };

  return (
    <button
      className={`${renderStyles()} p-8 w-20 h-20 flex items-center justify-center  bg-stone-100`}
      onClick={onClick}
      disabled={winner !== null}
    >
      {value && <p className="text-4xl"> {value}</p>}
    </button>
  );
};

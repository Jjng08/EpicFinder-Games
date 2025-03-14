import React from 'react'
import { Link } from "react-router-dom";
import type { Game } from '../types'

interface GameCardProps {
  game: Game
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="border rounded shadow hover:shadow-lg transition duration-300">
      <Link to={`/game/${game.id}`}>
        {game.background_image ? (
          <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
            Sin imagen
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold">{game.name}</h2>
          <p>Puntuación: {game.metacritic || 'N/A'}</p>
        </div>
      </Link>
    </div>
  )
}

export default GameCard

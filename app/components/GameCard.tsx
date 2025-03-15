import React from 'react';
import { Link } from "react-router-dom";
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  // Determinar el color del badge para Metacritic
  const getMetacriticColor = (score?: number) => {
    if (!score) return 'bg-gray-400 text-white';
    if (score >= 90) return 'bg-green-700 text-white';
    if (score >= 75) return 'bg-green-600 text-white';
    if (score >= 60) return 'bg-yellow-500 text-black';
    return 'bg-red-600 text-white';
  };

  return (
    <Link 
      to={`/game/${game.id}`}
      className="block w-full card rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="card transition-theme rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        {/* Imagen del juego con overlay */}
        <div className="relative overflow-hidden rounded-t-lg">
          {game.background_image ? (
            <img 
              src={game.background_image} 
              alt={game.name} 
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          )}
          
          {/* Badge de Metacritic */}
          {game.metacritic && (
            <span className={`absolute top-2 right-2 ${getMetacriticColor(game.metacritic)} text-xs font-semibold px-2.5 py-1 rounded`}>
              {game.metacritic}
            </span>
          )}

          {/* Overlay con gradiente para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-60"></div>
        </div>

        {/* Contenido de la tarjeta */}
        <div className="px-5 py-4">
          <h5 className="text-lg font-semibold tracking-tight line-clamp-2 min-h-[3.5rem]">
            {game.name}
          </h5>
          
          {/* Fecha de lanzamiento si existe */}
          {game.released && (
            <div className="text-sm text-muted mt-2">
              {new Date(game.released).toLocaleDateString()}
            </div>
          )}

          {/* Plataformas e información adicional */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-normal">
            {/* Plataformas */}
            <div className="flex space-x-1.5">
              {game.parent_platforms?.slice(0, 3).map(platform => (
                <PlatformIcon key={platform.platform.id} platformId={platform.platform.id} />
              ))}
              {(game.parent_platforms?.length || 0) > 3 && (
                <span className="platform-count">
                  +{game.parent_platforms!.length - 3}
                </span>
              )}
            </div>

            {/* Botón para ver más  */}
            <span className="details-button px-3 py-1.5 text-sm font-medium rounded-lg transition-colors">
              Ver detalles
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Componente para mostrar iconos de plataforma
const PlatformIcon = ({ platformId }: { platformId: number }) => {
  let icon;
  
  switch (platformId) {
    case 1: // PC
      icon = (
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path fill="currentColor" d="M0 13.772l6.545.902V8.426H0V13.772zM0 7.62h6.545V1.296L0 2.198V7.62zM7.265 14.8l8.735 1.2V8.425H7.265V14.8zM7.265 1.049v6.571h8.735V0L7.265 1.049z"/>
        </svg>
      );
      break;
    case 2: // PlayStation
      icon = (
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8.985 2.596v17.548l3.915 1.261v-6.393l3.399 1.016v-2.24l-3.399-1.145v-8.442l-3.915-1.605zM19.5 13.980v-3.647l-2.87-.605v2.744L19.5 13.98zM4.5 12.309l2.728 1.261V2.147L4.5 3.179v9.13z"/>
        </svg>
      );
      break;
    case 3: // Xbox
      icon = (
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 0c-2.246 0-4.197.529-5.928 1.686C6.027 1.723 5.975 1.76 5.929 1.8l5.359 5.358a.754.754 0 0 0 1.063 0L17.707 1.8C16.961 1 14.515 0 12 0zM5.93 1.801l.026-.025.015-.015C2.211 4.667 0 8.125 0 12c0 1.988.506 3.861 1.404 5.5.265-.341.565-.705.886-1.093 2.532-3.04 5.684-6.822 5.684-6.822s.34-.446.432-.774c.099-.353-.066-.843-.066-.843s-2.549-3.336-3.769-4.847a8.878 8.878 0 0 0-1.148-1.22zm12.146-.025l-.004-.005C16.152.99 14.218.348 12 .348c-.371 0-.731.023-1.086.064 1.616 1.396 5.196 5.472 6.838 7.37 0 0 .119.32.053.72-.067.404-.323.733-.323.733s-3.082 3.703-5.374 6.443c-.113.127-1.305 1.473-1.305 1.473.03.026.061.053.093.079 2.814-2.103 6.367-4.451 6.367-4.451s.626-.353.729-.756c.088-.347-.128-.735-.128-.735S12.52 4.79 12.044 3.999c-.035-.062-.075-.125-.112-.188 1.984-1.346 4.177-1.953 6.144-2.035zm-9.584 19.131c.009-.006.019-.01.028-.016-.009.006-.019.01-.028.016zm9.665-5.086c.009 0 .019-.002.028-.003-.1.001-.19.003-.28.003zm-.017-4.942s-.002-.016-.002-.018c-.012-.054-.035-.112-.057-.165.022.053.045.111.057.165 0 .002.002.011.002.018zm-2.91 7.578c-.032-.35.064.069.148.156-.084-.087-.18-.191-.148-.156zm1.287-1.646c-.04-.062-.082-.125-.127-.185.045.06.086.123.127.185z"/>
        </svg>
      );
      break;
    case 4: // Linux
      icon = (
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20.581 19.049h-.58c-.223 0-.412-.142-.486-.338-.101-.264-.177-.528-.242-.792-.453.025-.905.050-1.356.05-1.191 0-2.203-.136-3.116-.398.254.302.456.644.68.984.109.162.226.325.348.487.201.264.164.627-.083.849-.248.223-.627.193-.85-.057-1.021-1.146-1.625-2.489-2.476-3.734-.359.365-.687.729-1.127 1.081-.489.393-.988.737-1.525 1.018-.354.186-.774.052-.956-.295-.18-.345-.051-.769.295-.945.488-.261.934-.572 1.321-.909.317-.276.635-.552.936-.839-.461-.497-1.049-.838-1.638-1.178l-1.162-.673c-.286-.171-.361-.545-.19-.832.172-.287.546-.362.832-.19l1.163.672c.552.319 1.122.646 1.553 1.093.317-.276.635-.552.952-.828.317-.276.635-.552.952-.828-.552-1.021-1.088-2.072-1.626-3.115-.143-.277-.031-.62.254-.772.285-.15.625-.039.773.237.53 1.023 1.056 2.052 1.594 3.051.396-.333.793-.666 1.217-.984.928-.692 1.886-1.352 2.94-1.716-.159-.341-.393-.675-.654-.95-.215-.227-.235-.582-.047-.834.186-.253.539-.303.823-.08.386.3.711.689.917 1.132.896-.248 1.791-.372 2.708-.372.142 0 .284.005.427.011.112-.343.207-.687.323-1.031.099-.288.411-.457.712-.386.299.07.488.358.419.656-.138.59-.266 1.182-.395 1.772.564.301 1.126.602 1.689.904.299.161.412.529.256.83-.156.3-.528.418-.827.258-.562-.301-1.125-.603-1.688-.904-.159.518-.317 1.035-.475 1.553 1.127.452 2.394 1.452 2.068 2.616zM12.001 14.847c-2.225.078-4.442.681-6.677.983-.222.568-.397 1.165-.556 1.759-.124.47.353.901.816.79 1.633-.392 3.254-.802 4.899-1.089 1.121-.196 3.241-.502 3.59-1.92.113-.464-.417-.816-.848-.784-2.826.21-5.658.094-8.486.097-.055 0-.106.013-.161.018.146.336.241.689.351 1.029 2.776.013 5.552.141 8.32-.067-.99-.422-1.591-.847-1.248-1.716z"/>
        </svg>
      );
      break;
    case 5: // Apple
      icon = (
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/>
        </svg>
      );
      break;
    case 6: // Android
      icon = (
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M16.61 15.15c-.46 0-.83-.38-.83-.83v-5.32c0-.46.37-.84.83-.84s.83.38.83.84v5.32c0 .45-.37.83-.83.83zm-9.3 0c-.46 0-.83-.38-.83-.83v-5.32c0-.46.38-.84.83-.84s.83.38.83.84v5.32c0 .45-.37.83-.83.83zM17.45 5.47l1.03-1.89a.3.3 0 00-.11-.41.3.3 0 00-.41.11l-1.05 1.92C15.68 4.43 14.38 4 13 4c-1.38 0-2.68.43-3.9 1.21L8.04 3.29a.3.3 0 00-.41-.11.3.3 0 00-.12.41l1.03 1.89C6.62 6.9 5.56 8.93 5.56 11.2v.8H18.5V11c0-2.27-1.07-4.3-2.99-5.71l-.06-.04zM9.5 10a.9.9 0 01-.9-.9c0-.5.4-.9.9-.9s.9.4.9.9-.4.9-.9.9zm5 0a.9.9 0 01-.9-.9c0-.5.4-.9.9-.9s.9.4.9.9-.4.9-.9.9zM5.83 19.43c0 .8.65 1.45 1.45 1.45h1.47v2.29c0 .46.38.83.83.83.46 0 .83-.37.83-.83v-2.29h2.29v2.29c0 .46.37.83.83.83.45 0 .83-.37.83-.83v-2.29h1.47c.8 0 1.45-.65 1.45-1.45v-7.15H5.83v7.15z"/>
        </svg>
      );
      break;
    case 7: // Nintendo
      icon = (
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18 13.5v-3.8c0-.8-.6-1.3-1.3-1.3h-3.8v12.4h3.8c.7 0 1.3-.6 1.3-1.3v-6M16.9 17c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5v4M7.3 3.9h3.8v7.9H7.3c-.7 0-1.3-.6-1.3-1.3V5.2c0-.7.6-1.3 1.3-1.3m.7 6c0 .3.2.5.5.5s.5-.2.5-.5v-4c0-.3-.2-.5-.5-.5s-.5.2-.5.5zm10-6.8H6C2.7 3.2 0 5.9 0 9.2v5.5c0 3.3 2.7 6 6 6h12c3.3 0 6-2.7 6-6V9.2c0-3.3-2.7-6-6-6z"/>
        </svg>
      );
      break;
    default:
      icon = (
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M17.5 3a.5.5 0 00-.5.5V4h-3V3H10v1H7V3a.5.5 0 00-.5-.5H6a.5.5 0 00-.5.5v2c0 .827.673 1.5 1.5 1.5h9c.827 0 1.5-.673 1.5-1.5v-2a.5.5 0 00-.5-.5h-.5zM12 8a8 8 0 100 16 8 8 0 000-16zm0 6a2 2 0 110 4 2 2 0 010-4z"/>
        </svg>
      );
  }
  
  return (
    <div className="platform-icon" title={`Plataforma ${platformId}`}>
      {icon}
    </div>
  );
};

export default GameCard;

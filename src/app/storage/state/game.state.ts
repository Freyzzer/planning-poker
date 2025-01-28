export interface Game{
  id: string;
  name: string;
  players:string[];
}

export interface Player {
    id: string;
    name: string;
    view: string;
    card: string | null; // Carta seleccionada por el jugador
    isAdmin: boolean;    // Si el jugador es el admin
  }

  
  export interface GameState {
    players: Player[];
    isVotingRevealed: boolean; // Estado de la votación (oculto/revelado)
    currentSprint: string;  
    games: Game[];   // Ejemplo: "Sprint 32"
  }
  
  export const initialGameState: GameState = {
    players: [
      { id: '1', name: 'David', view: 'spectator',card: null, isAdmin: false }, // Ejemplo de jugador admin
      { id: '2', name: 'Miguel', view: 'player',card: '3', isAdmin: false }, // Ejemplo de jugador admin
      { id: '3', name: 'Maria', view: 'player',card: '8', isAdmin: false }, // Ejemplo de jugador admin
      { id: '4', name: 'JuanSe', view: 'player',card: '55', isAdmin: false }, // Ejemplo de jugador admin
      { id: '5', name: 'Melissa', view: 'player',card: '89', isAdmin: false }, // Ejemplo de jugador admin/ Ejemplo de jugador admin
      // Agregar más jugadores según sea necesario
    ],
    isVotingRevealed: false,
    currentSprint: 'Sprint 32',
    games:[]
  };
  
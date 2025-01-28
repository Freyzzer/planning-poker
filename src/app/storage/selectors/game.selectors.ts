import { createSelector,createFeatureSelector } from '@ngrx/store';
import { GameState, Player } from '../state/game.state';


// Selecciona el estado 'game' directamente del árbol global
export const selectGameState = createFeatureSelector<GameState>('game');

export const selectGameById = (gameId: string) =>
  createSelector(selectGameState, (state: GameState) =>
    state.games.find(game => game.id === gameId)
  );

export const selectGame = createSelector(
  selectGameState,
  (state: GameState) => state.games,
);

export const selectPlayers = createSelector(
  selectGameState,
  (state: GameState) => state.players,
);

export const selectPlayerById = (id: string) => createSelector(
  selectGameState, // Selector base que obtiene el estado del juego
  (state: GameState): Player | undefined =>
    state.players.find((players) => players.id === id)
);

export const selectIsVotingRevealed = createSelector(
  selectGameState,
  (state: GameState) => state.isVotingRevealed
);

// Selector para obtener el jugador admin
export const selectAdminPlayer = createSelector(
  selectPlayers,
  players => players.find(player => player.isAdmin)
);

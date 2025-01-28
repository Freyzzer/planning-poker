import { createAction, props } from '@ngrx/store';
import { Player, Game } from '../state/game.state';

// Acción para que un jugador seleccione una carta
export const selectCard = createAction(
  '[Game] Select Card',
  props<{ playerId: string; card: string }>()
);

// Acción para revelar votaciones
export const revealVoting = createAction('[Game] Reveal Voting');

// Acción para ocultar votaciones
export const hideVoting = createAction('[Game] Hide Voting');

export const toggleRevealVotes = createAction('[Game] Toggle Reveal Votes');

//Accion de añadir un jugador a la partida
console.log('playerrr')
export const addPlayer = createAction(
  '[Game] Add Player',
  props<{gameId: string, player: Player }>(),
);

//Accion de crear una partida
console.log('partida')
export const createGame = createAction(
  '[Game] Create Game',
  props<{game:Game}>()
);


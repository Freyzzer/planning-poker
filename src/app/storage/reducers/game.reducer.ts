import { createReducer, on } from '@ngrx/store';
import { initialGameState } from '../state/game.state';
import { selectCard, revealVoting, hideVoting,addPlayer, createGame, toggleRevealVotes } from '../action/game.actions';

export const gameReducer = createReducer(
  initialGameState,
  // Acción: un jugador selecciona una carta
  on(selectCard, (state, { playerId, card }) => ({
    ...state,
    players: state.players.map(player =>
      player.id === playerId ? { ...player, card } : player
    ),
  })),
  // Acción: revelar votaciones
  on(revealVoting, state => ({
    ...state,
    isVotingRevealed: true,
  })),
  // Acción: ocultar votaciones
  on(hideVoting, state => ({
    ...state,
    isVotingRevealed: false,
  })),

  on(toggleRevealVotes, state => ({
    ...state,
    isVotingRevealed: !state.isVotingRevealed,
  })),

  //Acción: Añadir Jugador
  on(addPlayer, (state, { gameId,player }) => ({
    ...state,
    games: (state.games || []).map(game =>
      game.id === gameId
        ? { ...game, players: [...game.players, player.id] }
        : game
    ),
    players:[...state.players,player]
  })),

  //
  on(createGame, (state,{game}) =>({
    ...state,
    games:[...state.games,game]
  }))

);

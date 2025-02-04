import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameState, Player } from '../../storage/state/game.state';
import { map, Observable } from 'rxjs';
import { selectPlayerById, selectPlayers } from '../../storage/selectors/game.selectors';
import { addPlayer, updatePlayerView } from '../../storage/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private readonly store: Store<GameState>) { }

  //Crear Jugador
  createPlayer(id:string, user:any){
    this.store.dispatch(addPlayer({gameId:id ,player: user }))
  }

  //Obtener a todos los jugadores
  getPlayers(): Observable<Player[]>{
    return this.store.pipe(select(selectPlayers));
  }

  //Obtener a un jugador en especifico
  getPlayerById(id:string):Observable<Player | undefined>{
    return this.store.pipe(select(selectPlayerById(id)))
  }

  //Obtener Jugador por visualización
  getPlayersByView(view:string): Observable<Player[] | undefined>{
    return this.store.pipe(
      select(selectPlayers),
      map((players) => players.filter((player) => player.view === view))
    );
  }

  //Actualizar vista del jugador 
  updateViewPlayer(user: {playerId:string,newView:string}){
    this.store.dispatch(updatePlayerView(user))
  }

}

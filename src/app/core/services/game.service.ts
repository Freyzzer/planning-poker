import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Game, GameState } from '../../storage/state/game.state';
import { Observable } from 'rxjs';
import { selectGame } from '../../storage/selectors/game.selectors';
import { createGame } from '../../storage/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private readonly store:Store<GameState>) { }


  //Crear Partida
  createGame(Game:any){
    this.store.dispatch(createGame({game:Game}))
  }

  //Obtener Partida
  getGame(): Observable<Game[]> | undefined{
    return this.store.pipe(select(selectGame))
  }

}

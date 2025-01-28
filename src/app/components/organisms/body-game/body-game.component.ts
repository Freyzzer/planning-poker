import { Component, Input } from '@angular/core';
import { TableComponent } from '../../atoms/table/table.component';
import { CardComponent } from '../../atoms/card/card.component';
import { select, Store } from '@ngrx/store';
import { GameState, Player} from '../../../storage/state/game.state';
import { Observable, take } from 'rxjs';
import { selectPlayerById, selectPlayers } from '../../../storage/selectors/game.selectors';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-body-game',
  standalone: true,
  imports: [TableComponent, CardComponent, CommonModule,],
  templateUrl: './body-game.component.html',
})
export class BodyGameComponent {
  players$: Observable<any>;
  myPlayer$: Observable<any>;
  id = '';
  @Input() view: string = '';


  onUserRegistered(user: { view: string; name: string }) {
    this.view = user.view;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('asda', this.view)
    this.id = localStorage.getItem('id') ?? ''
  }

  constructor(private readonly store: Store<GameState>){
    this.players$ = this.store.pipe(select(selectPlayers));
    this.myPlayer$ = this.store.pipe(select(selectPlayerById(this.id)));
  }



  private withPlayers(callback: (players: Player[]) => void): void{
    this.players$.pipe(take(1)).subscribe(callback);
  }


}

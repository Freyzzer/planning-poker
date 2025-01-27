import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPlayers, selectIsVotingRevealed } from '../../../storage/selectors/game.selectors';
import { revealVoting } from '../../../storage/action/game.actions';
import { Player } from '../../../storage/state/game.state';
import { CardPlayerComponent } from '../card-player/card-player.component';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, CardPlayerComponent],
  templateUrl: './table.component.html'
})
export class TableComponent {
  players$: Observable<Player[]>;
  isVotingRevealed$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.players$ = this.store.select(selectPlayers);
    this.isVotingRevealed$ = this.store.select(selectIsVotingRevealed);
  }

  onRevealVotes() {
    this.store.dispatch(revealVoting());
  }

  getPositionStyle(index: number, total: number): string {
    const angle = (index / total) * 360; // Ángulo de posición
    const radiusX = 320; // Radio del círculo en px
    const radiusY = 250; // Radio del círculo en px
    const x = radiusX * Math.cos((angle * Math.PI) / 180); // Coordenada X
    const y = radiusY * Math.sin((angle * Math.PI) / 180); // Coordenada Y
    return `translate(0, 0) translate(${x}px, ${y}px)`;
  }
  


  getCardUser(player:any){
    if (player.card) {
      return player.card;
    }
  
    if (player.views === 'espectador') {
      return '🕶️'; // Diseño tipo espectador
    }
  
    return '🃏'; // Carta en blanco
  }

}

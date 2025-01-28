import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { selectPlayers } from '../../../storage/selectors/game.selectors';
import { selectCard } from '../../../storage/action/game.actions';
import { Player, GameState } from '../../../storage/state/game.state';
import { CardPlayerComponent } from '../card-player/card-player.component';
import { ButtonCustomComponent } from '../button-custom/button-custom.component';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, CardPlayerComponent, ButtonCustomComponent],
  templateUrl: './table.component.html'
})
export class TableComponent {
  isVotingRevealed: boolean = false;
  players$: Observable<Player[]>;
  @Input() view = ''

  constructor(private readonly store: Store<GameState>) {
    this.players$ = this.store.pipe(select(selectPlayers));
  }
  
  
  private withPlayers(callback: (players: Player[]) => void): void{
    this.players$.pipe(take(1)).subscribe(callback);
  }

  onRevealVotes(event:boolean):void {
    this.isVotingRevealed = !this.isVotingRevealed;
    if(this.isVotingRevealed === false)
    {
      this.withPlayers(players => {
        console.log('Jugadores actualizados:', players);
        players.forEach(player => {
          this.store.dispatch(selectCard({ playerId: player.id, card: '' }));
        });
      });
    }
  }

  promedio(): number{
    let score:number = 0;
    let count = 0;

    this.withPlayers(players => {
      players.forEach(player => {
        const value = player.card ?? 0;
        score += +value;
        count++;
      });
    });
    
    return score/count;
  }

  getPositionStyle(index: number, total: number): string {

    const angle = (index / total) * 360; // Ángulo de posición
    const radiusY = 400;
    const radiusX = 550; // Radio del círculo en px // Radio del círculo en px
    const x = radiusX * Math.cos((angle * Math.PI) / 180); // Coordenada X
    const y = radiusY * Math.sin((angle * Math.PI) / 180); // Coordenada Y
    return `translate(${x}px, ${y}px)`;
  }
  

}

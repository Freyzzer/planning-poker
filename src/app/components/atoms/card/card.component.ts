import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectCard } from '../../../storage/action/game.actions';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { selectIsVotingRevealed, selectPlayers } from '../../../storage/selectors/game.selectors';
import { GameState, Player } from '../../../storage/state/game.state';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  scoreOptions = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'];
  selectedCards: string[] = [];
  playerId:string ='';
  isVotingRevealed$: Observable<boolean>;
  cardVotes: { [key: string]: number } = {}; // Guardar los votos por carta
  total:number  = 0;
  id = ''
  players$: Observable<any>
  isPlayer = true;
  @Input() view: string = '';

  constructor(private readonly store: Store<GameState>) {
    this.isVotingRevealed$ = this.store.pipe(select(selectIsVotingRevealed));
    this.players$ = this.store.pipe(select(selectPlayers));
  }

   private withPlayers(callback: (players: Player[]) => void): void{
      this.players$.pipe(take(1)).subscribe(callback);
    }
  
  ngOnInit() {
    this.id = localStorage.getItem('id') ?? '';
    
    if (this.isVotingRevealed$) {
      this.calculateCardVotes();
    } else {
      this.resetVotes();
    }
  }

   calculateCardVotes(): number{
    // Escucha cambios en el estado de revelación y calcula las cartas más votadas
    this.cardVotes = {} // reiniciar el conteo
    let index = 0;
    this.store.pipe(select(selectPlayers),take(1)).subscribe(players => {

      players.forEach(player => {
        if (player.card) {
          this.cardVotes[player.card] = (this.cardVotes[player.card] || 0) + 1;
          this.total = +(player.card) + this.total; 
          index++;
        }
      });
    });
    return this.total/index
  }

  // Método para reiniciar votos
  private resetVotes(): void {
    this.cardVotes = {};
  }

  getCardsWithVotes(): { card: string; votes: number }[] {
    return Object.entries(this.cardVotes).map(([card, votes]) => ({
      card,
      votes,
    }));
  }

  onSelectCard(card: string) {
    this.playerId = localStorage.getItem('id') ?? '';
    this.selectedCards = [card];
    console.log("selecciono: ", selectCard({ playerId: this.playerId, card }))
    this.store.dispatch(selectCard({ playerId: this.playerId, card }));
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      // Prevent default action for the Space key to avoid scrolling
      event.preventDefault();
      this.onClickHandler();
    }
  }
  
  onClickHandler(): void {
    console.log('Button clicked or activated via keyboard');
  }


}

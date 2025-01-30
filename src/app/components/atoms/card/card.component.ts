import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { changeScoringType, selectCard } from '../../../storage/action/game.actions';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectIsVotingRevealed, selectPlayers,selectScoringType } from '../../../storage/selectors/game.selectors';
import { GameState, Player } from '../../../storage/state/game.state';
import { ButtonSubmitCustomComponent } from "../button-submit-custom/button-submit-custom.component";


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonSubmitCustomComponent],
  templateUrl: './card.component.html',
})
export class CardComponent {
  selectedCards: string[] = [];
  playerId:string ='';
  isVotingRevealed$: Observable<boolean>;
  cardVotes: { [key: string]: number } = {}; // Guardar los votos por carta
  total:number  = 0;
  id = ''
  cardsWithVotes$: Observable<{ card: string; votes: number }[]>;
  players$: Observable<any>
  isPlayer = true;
  @Input() view: string = '';
  averageVote$: Observable<number>;
  scoreOptions: string[] = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'];
  scoringType$: Observable<string>;
  isAdmin = false;
  isVisible = false;

  constructor(private readonly store: Store<GameState>) {
    this.isVotingRevealed$ = this.store.pipe(select(selectIsVotingRevealed));
    this.players$ = this.store.pipe(select(selectPlayers));

    this.cardsWithVotes$ = this.players$.pipe(
      map(players => {
        const cardVotes: { [key: string]: number } = {};
        players.forEach((player: Player) => {
          if (player.view === 'player' && player.card) {
            cardVotes[player.card] = (cardVotes[player.card] || 0) + 1;
          }
        });
        return Object.entries(cardVotes).map(([card, votes]) => ({ card, votes }));
      })
    );
    
    // Calcular el promedio solo entre jugadores con view === 'player'
    this.averageVote$ = this.players$.pipe(
      map(players => {
        // Filtrar jugadores que tienen 'view' como 'player'
        const validCards = players
          .filter((player: Player) => player.view === 'player' && player.card) // Filtrar solo jugadores 'player' con carta
          .map((player: Player) => Number(player.card)) // Convertir a número
          .filter((value: number) => !isNaN(value)); // Excluir valores no numéricos
    
        const total = validCards.reduce((sum: number, value: number) => sum + value, 0);
        const average = validCards.length > 0 ? total / validCards.length : 0;
        return parseFloat(average.toFixed(1)); // Redondear a un decimal
      })
    );


    //
    this.scoringType$ = this.store.pipe(select(selectScoringType));

    // Escuchar cambios en la puntuación
    this.scoringType$.subscribe(type => {
      this.updateScoreOptions(type);
    });
  }

  ngOnInit() {
    this.store.pipe(select(selectPlayers)).subscribe(players => {
      console.log('Jugadores actualizados:', players);
      this.id = localStorage.getItem('id') ?? '';
      const player = players.find(p => p.id === this.id);
      if (player) {
        this.view = player.view ?? '';
        this.isAdmin = true}
    });
  }
  
  onChangeScoringType(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.store.dispatch(changeScoringType({ scoringType: target.value })); 
    }
  }
  
  

  updateScoreOptions(type: string) {
    if (type === 'Fibonacci') {
      this.scoreOptions = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'];
    } else if (type === 'PowersOfTwo') {
      this.scoreOptions = ['1', '2', '4', '8', '16', '32', '64', '128', '256', '512', '?', '☕'];
    } else {
      this.scoreOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '?', '☕']; // Default
    }
  }

  onSubmit(){
    this.isVisible = !this.isVisible
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

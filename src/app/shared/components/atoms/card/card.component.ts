import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { changeScoringType, selectCard } from '../../../../storage/actions/game.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsVotingRevealed, selectScoringType } from '../../../../storage/selectors/game.selectors';
import { GameState } from '../../../../storage/state/game.state';
import { ButtonSubmitCustomComponent } from "../button-submit-custom/button-submit-custom.component";
import { PlayerService } from '../../../../core/services/player.service';
import { VoteService } from '../../../../core/services/vote.service';
import { IdService } from '../../../../core/services/id.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonSubmitCustomComponent],
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  selectedCards: string[] = [];
  isVotingRevealed$: Observable<boolean>;
  id = '';
  cardsWithVotes$: Observable<{ card: string; votes: number }[]> = new Observable();
  @Input() view: string = '';
  averageVote$: Observable<number> = new Observable();
  scoreOptions: string[] = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'];
  scoringType$: Observable<string>;
  isAdmin = false;
  isVisible = false;
  show = false;

  constructor(
    private readonly store: Store<GameState>,
    private readonly vote: VoteService,
    private readonly player: PlayerService,
    private readonly idService: IdService
  ) {
    this.isVotingRevealed$ = this.store.pipe(select(selectIsVotingRevealed));
    this.averageVote$ = this.vote.getAverageVote();
    this.cardsWithVotes$ = this.vote.getCardsWithVotes();

    // Tipo de puntuación
    this.scoringType$ = this.store.pipe(select(selectScoringType));
    // Escuchar cambios en la puntuación
    this.scoringType$.subscribe(type => {
      this.updateScoreOptions(type);
    });
  }

  ngOnInit(): void {
    // Suscribirse al ID para recibir actualizaciones en tiempo real
    this.idService.id$.subscribe(id => {
      this.id = id;
      this.player.getPlayerById(this.id).subscribe(player => {
        if (player) {
          console.log('Jugador encontrado:', player);
          this.show = true;
          this.view = player.view ?? '';
          this.isAdmin = true;
        } else {
          console.log('Jugador no encontrado');
        }
      });
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

  onSubmit() {
    this.isVisible = !this.isVisible;
  }

  onSelectCard(card: string) {
    this.id = this.idService.getId(); // Obtener el ID actual
    this.selectedCards = [card];
    console.log("Seleccionó: ", selectCard({ playerId: this.id, card }));
    this.store.dispatch(selectCard({ playerId: this.id, card }));
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      // Prevenir la acción predeterminada para la tecla Espacio y evitar el desplazamiento
      event.preventDefault();
      this.onClickHandler();
    }
  }

  onClickHandler(): void {
    console.log('Botón clickeado o activado mediante teclado');
  }
}
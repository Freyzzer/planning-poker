import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { GameState } from '../../../storage/state/game.state';
import { selectPlayers, selectIsVotingRevealed } from '../../../storage/selectors/game.selectors';

@Component({
  selector: 'app-card-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-player.component.html',
})
export class CardPlayerComponent {
  @Input() namePlayer: string = '';
  @Input() viewPlayer: string = '';
  @Input() score: string = '';
  @Input() isreveal: boolean = false;
  @Output() clickEvent = new EventEmitter<void>();
  info ='';
  players$: Observable<any>;
  hasCard$: Observable<boolean>; // Observable para verificar si el jugador tiene una carta
  isVotingRevealed$: Observable<boolean>; // Observable para verificar si las cartas han sido reveladas

  constructor(private readonly store: Store<GameState>) {
    this.players$ = this.store.pipe(select(selectPlayers));
    this.isVotingRevealed$ = this.store.pipe(select(selectIsVotingRevealed));

    // Observable para verificar si el jugador ha seleccionado una carta
    this.hasCard$ = this.players$.pipe(
      map(players => {
        if (!Array.isArray(players)) return false; // Asegura que players es un array
        const player = players.find((p: any) => p.name === this.namePlayer);
        return player ? !!player.card : false;
      })
    );
  }

  // Método para manejar el clic en la carta
  onClick() {
    this.clickEvent.emit();
  }

  // Método para obtener el estilo dinámico de la carta
  getStyle(hasCard: boolean, isreveal: boolean): string {
    let baseStyle = `w-12 h-18 border rounded-lg shadow-md flex items-center justify-center`;
    let spectatorStyle = `w-12 h-12 bg-[#BDBDFF] rounded-full flex items-center justify-center text-primary-500`;

    // Lógica para el jugador actual
    if (this.viewPlayer === 'player') {
      if (!hasCard) {
        return `${baseStyle} bg-transparent border-white ${isreveal ? 'text-white' : 'text-primary-500'}`;
      }

      if (hasCard) {
        return `${baseStyle} ${isreveal ? 'bg-transparent text-white' : 'bg-[#BB65FF] text-primary-500'}`;
      }
    }

    // Lógica para el espectador
    if (this.viewPlayer === 'spectator') {
      this.info = this.namePlayer.slice(0, 2).toUpperCase()
      return spectatorStyle;
    }

    // Estilo predeterminado
    return '';
  }
}
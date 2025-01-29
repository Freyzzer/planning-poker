import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState } from '../../../storage/state/game.state';
import { selectPlayers } from '../../../storage/selectors/game.selectors';


@Component({
  selector: 'app-card-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-player.component.html',
})
export class CardPlayerComponent {
  @Input() namePlayer: any = '';
  @Input() viewPlayer: any = '';
  @Input() score: any = '';
  @Input() isreveal: any = false;
  @Output() clickEvent = new EventEmitter<void>();
  views: string = '';
  info: string = '';
  player$: Observable<any>;
  players: any = {}; // Almacenar los jugadores
  hasCard: boolean = false;

  constructor(private readonly store: Store<GameState>) {
    this.player$ = this.store.pipe(select(selectPlayers));
  }

  ngOnInit(): void {
    this.views = this.viewPlayer || '';
    this.store.pipe(select(selectPlayers)).subscribe(players => {
      console.log('Jugadores actualizados:', players);
      if (players) {
        this.players = players;  // Guardamos los jugadores
        this.checkPlayers(); // Verificamos si alguno ha escogido carta
      }
    });
  }

  // Función para recorrer los jugadores y cambiar el estilo de la carta
  checkPlayers() {
    // Recorremos todos los jugadores
    Object.keys(this.players).forEach(playerId => {
      const player = this.players[playerId];
      if (player.card) {
        this.hasCard = true;  // Marcar que el jugador ha escogido una carta
      } else {
        this.hasCard = false;  // Si no tiene carta, lo marcamos también
      }
    });
  }
  
  onClick() {
    this.clickEvent.emit(); // Emitir el evento al componente padre
  }

  // Cambiar el estilo según el jugador
  getStyle(): string {
    let baseStyle = `w-12 h-18 border rounded-lg shadow-md flex items-center justify-center`;
    let spectatorStyle = `w-12 h-12 bg-[#BDBDFF] rounded-full flex items-center justify-center text-primary-500`;
  
    // Lógica para el jugador actual
    if (this.viewPlayer === 'player') {
      if (!this.hasCard) {
        return `${baseStyle} bg-transparent border-white ${this.isreveal ? 'text-white' : 'text-primary-500'}`;
      }
  
      if (this.hasCard) {
        this.info = this.isreveal ? this.score : '';
        return `${baseStyle} ${this.isreveal ? 'bg-transparent text-white' : 'bg-[#BB65FF] text-primary-500'} border-white`;
      }
    }
  
    // Lógica para el espectador
    if (this.viewPlayer === 'spectator') {
      this.info = this.namePlayer.slice(0, 2);
      return spectatorStyle;
    }
  
    // Estilo predeterminado
    return '';
  }
  
}

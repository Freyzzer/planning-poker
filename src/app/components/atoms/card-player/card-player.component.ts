import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { selectPlayerById } from '../../../storage/selectors/game.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState } from '../../../storage/state/game.state';

@Component({
  selector: 'app-card-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-player.component.html',
})
export class CardPlayerComponent {
  @Input() namePlayer: any = '';
  @Input() viewPlayer: any = '';
  views: string = '';
  letters: string = '';
  player$: Observable<any>;
  id: string = localStorage.getItem('id') ?? '';
  hasCard: boolean = false;

  constructor(private readonly store: Store<GameState>) {

    this.player$ = this.store.pipe(select(selectPlayerById(this.id)));
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.views = this.viewPlayer || '';
    this.store.pipe(select(selectPlayerById(this.id))).subscribe(players => {
      console.log('Jugadores actualizados:', players);
      if (players) {
        if (players.card) {
          this.hasCard = true
        }

        if (!players.card) {
          this.hasCard = false
        }
      }
    });

  }

  getStyle(): string {
    console.log('caarta', this.hasCard)
    if (this.viewPlayer === 'player') {
      if (!this.hasCard) {
        return `w-12 h-18 bg-transparent border border-white rounded-lg shadow-md flex items-center justify-center text-white`;
      } else {
        return `w-12 h-18 bg-[#BB65FF] border border-white rounded-lg shadow-md flex items-center justify-center text-white`;
      }

    }
    if (this.viewPlayer === 'spectator') {
      this.letters = this.namePlayer.slice(0, 2)
      return `w-12 h-12 bg-[#BDBDFF] rounded-full flex items-center justify-center`
    }
    return ''
  }
}

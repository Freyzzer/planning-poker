import { Component, Output,EventEmitter } from '@angular/core';
import { toggleRevealVotes } from '../../../storage/action/game.actions';
import { Store } from '@ngrx/store';
import {GameState} from'../../../storage/state/game.state'

@Component({
  selector: 'app-button-custom',
  standalone: true,
  imports: [],
  templateUrl: './button-custom.component.html',
})
export class ButtonCustomComponent {
  @Output() reveal: EventEmitter<false> = new EventEmitter();
  isreveal:boolean = false;
  text:string = 'Revelar Votaciones'

  constructor(private readonly store:Store<GameState>){

  }

  onClick() {
    this.store.dispatch(toggleRevealVotes());
    this.isreveal = !this.isreveal;
    if(this.isreveal ===true)
      {
        this.text = 'Nueva Votación';
      } else{
        this.text = 'Revelar Votacion';
      }
    this.reveal.emit(); // Emitir el evento al componente padre
  }
}

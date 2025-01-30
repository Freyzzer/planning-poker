import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { selectPlayers } from '../../../storage/selectors/game.selectors';
import { selectCard, updatePlayerView } from '../../../storage/action/game.actions';
import { Player, GameState } from '../../../storage/state/game.state';
import { CardPlayerComponent } from '../card-player/card-player.component';
import { ButtonCustomComponent } from '../button-custom/button-custom.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonSubmitCustomComponent } from '../button-submit-custom/button-submit-custom.component';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, CardPlayerComponent, ButtonCustomComponent, ReactiveFormsModule, ButtonSubmitCustomComponent],
  templateUrl: './table.component.html'
})
export class TableComponent {
  isVotingRevealed: boolean = false;
  players$: Observable<Player[]>;
  @Input() view = ''
  @Input() myView = ''
  idSelected = '';
  isReveal = false;
  form: FormGroup;

  constructor(private readonly store: Store<GameState>, private readonly fb:FormBuilder) {
    this.players$ = this.store.pipe(select(selectPlayers));
    this.form = this.fb.group({
      view: new FormControl('',[Validators.required])
    })
  }
  
  updateView(){
      if (this.form.valid) {
        const view = this.form.value.view;
        const user = { playerId: this.idSelected, newView: view };
        console.log('Formulario enviado correctamente');
        this.store.dispatch(updatePlayerView(user));
        this.isReveal = false;
      } else {
        console.error('Formulario inválido o vista no seleccionada');
      }
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


  onSubmit(id:string){
    if(this.view === 'player')
    {
      this.idSelected = id;
      this.isReveal = true
    }
  }

  closeModal(){
    this.isReveal = false
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.updateView()
  }

  getPositionStyle(index: number, total: number): string {

    const angle = (360 / total) * index; // Ángulo de posición
    const radiusY = 260;
    const radiusX = 380; // Radio del círculo en px // Radio del círculo en px
    const x = radiusX * Math.cos((angle * Math.PI) / 180); // Coordenada X
    const y = radiusY * Math.sin((angle * Math.PI) / 180); // Coordenada Y
    return `translate(${x}px, ${y}px)`;
  }
  

}

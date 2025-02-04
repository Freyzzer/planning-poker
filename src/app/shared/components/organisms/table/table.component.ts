import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { selectPlayers } from '../../../../storage/selectors/game.selectors';
import { selectCard, toggleRevealVotes, updatePlayerView } from '../../../../storage/actions/game.actions';
import { Player, GameState } from '../../../../storage/state/game.state';
import { CardPlayerComponent } from '../../atoms/card-player/card-player.component';
import { ButtonCustomComponent } from '../../atoms/button-custom/button-custom.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import { PlayerService } from '../../../../core/services/player.service';


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
  isLoading:boolean = false;
  changeText:boolean = false
  text:string = 'Revelar votaciones'

  constructor(private readonly store: Store<GameState>, private readonly fb:FormBuilder, private readonly player: PlayerService) {
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

  onRevealVotes(): void {
    // Si el botón dice 'Revelar votaciones'
    if (this.text === 'Revelar votaciones') {
      this.isLoading = true; // Activar el estado de carga (animación)
      this.changeText = !this.changeText; // Cambiar el estado del texto
      // Simular la animación con un setTimeout
      setTimeout(() => {
        this.isLoading = false; // Desactivar el estado de carga
        this.isVotingRevealed = true;
        this.text = 'Nueva votación'; // Cambiar el texto del botón
        this.store.dispatch(toggleRevealVotes()); // Despachar la acción para revelar las votaciones
      }, 2000); // Duración de la animación (2 segundos)
    }
    // Si el botón dice 'Nueva votación'
    else if (this.text === 'Nueva votación') {
      this.changeText = !this.changeText; // Cambiar el estado del texto
  
      // Simular la animación con un setTimeout
      this.store.dispatch(toggleRevealVotes());
      this.text = 'Revelar votaciones'; // Cambiar el texto del botón
      this.isVotingRevealed = false; // Reiniciar el estado de las votaciones
  
      // Reiniciar las cartas de los jugadores
      this.withPlayers((players) => {
        players.forEach((player) => {
          this.store.dispatch(selectCard({ playerId: player.id, card: '' })); // Despachar la acción para reiniciar las cartas
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
    const radiusY = 280;
    const radiusX = 380; // Radio del círculo en px // Radio del círculo en px
    const x = radiusX * Math.cos((angle * Math.PI) / 180); // Coordenada X
    const y = radiusY * Math.sin((angle * Math.PI) / 180); // Coordenada Y
    return `translate(${x}px, ${y}px)`;
  }
  

}

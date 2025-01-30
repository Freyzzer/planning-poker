import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../button-submit-custom/button-submit-custom.component';
import { updatePlayerView } from '../../../storage/action/game.actions';
import { Store } from '@ngrx/store';
import { GameState } from '../../../storage/state/game.state';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ButtonSubmitCustomComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  isvisible =false;
  id = '';
  form:FormGroup;
  @Input() letters='';

  constructor(private readonly store:Store<GameState>, private readonly fb: FormBuilder){
    this.form = this.fb.group({
      view: new FormControl('',[Validators.required])
    }) 
  }

  handleModal(){
    this.id = localStorage.getItem('id') ?? '';
    this.isvisible = !this.isvisible
  }

onSubmit(){
  const view = this.form.value.view;
  const user = {playerId: this.id, newView: view}
  if(this.form.valid)
  {
    console.log('formalurio correctamente')
    this.store.dispatch(updatePlayerView(user))
  }
  this.isvisible = false
}

  closeModal(){
    this.isvisible = false
  }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../button-submit-custom/button-submit-custom.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerService } from '../../../../core/services/player.service';
import { IdService } from '../../../../core/services/id.service';

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
  @Output() view = new EventEmitter<{ view: string }>();


  constructor( private readonly fb: FormBuilder, private readonly player: PlayerService, private readonly idService: IdService){
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
  const user = {playerId: this.idService.getId(), newView: view}
  if(this.form.valid)
  {
    console.log('formalurio correctamente')
    this.player.updateViewPlayer(user)
    this.view.emit({ view }); // 🔥 Enviar un objeto con { view: Observable<string> }
  }
  this.isvisible = false
}

  closeModal(){
    this.isvisible = false
  }

}

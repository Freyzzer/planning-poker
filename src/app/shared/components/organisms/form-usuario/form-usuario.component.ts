import { Component,EventEmitter, Output, Input } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import {FormControl, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import {GameState} from'../../../../storage/state/game.state'
import { selectPlayers } from '../../../../storage/selectors/game.selectors';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IdService } from '../../../../core/services/id.service';
import { FormValidatorService } from '../../../../core/services/formValidator.service';
import { PlayerService } from '../../../../core/services/player.service';


@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonSubmitCustomComponent],
  templateUrl: './form-usuario.component.html',
})

export class FormUsuarioComponent {
  @Input() isVisible:boolean = true;
  formUser: FormGroup;
  players$: Observable<any>;
  @Output() onRegister: EventEmitter<{name: string; views: string }> = new EventEmitter();
  formErrors: { name?: string } = {};
  id = ''
  
  constructor(private readonly route: ActivatedRoute, private readonly fb:FormBuilder, private readonly store:Store<GameState>, private readonly idService:IdService, private readonly validators:FormValidatorService, private readonly player:PlayerService){
    this.formUser = this.fb.group({
      name: ['', []], // Campo para el nombre de la partida
      views: new FormControl('',[Validators.required])
    })
    this.players$ = this.store.pipe(select(selectPlayers));
  }
  
  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.id = this.idService.getId()
    this.player.getPlayerById(this.id).subscribe(player =>{
      if(player)
      {
        console.log('view en player bro', player.view)
        this.onRegister.emit({name: player.name, views:player.view});
      }
    })

    this.store.select(selectPlayers).subscribe(players => {
      console.log('juggggggggggggg', players)
    });
  }

  onSubmit() {
    const id:string = this.route.snapshot.paramMap.get('id') ?? '';
    const idPlayer = crypto.randomUUID()
    const user = {id:idPlayer,name:this.formUser.value.name, view:this.formUser.value.views, card:null,isAdmin:true}
    const newUser = {
      id: idPlayer,
      name: this.formUser.value.name ,
      views: this.formUser.value.views 
    };
    //
    const name = this.formUser.value.name.trim();
    this.formErrors = {}
    const validationError = this.validators.validateForm(name);

    if (validationError && !this.formUser.valid) {
      this.formErrors.name = validationError;
      return;
    }

    if(this.formUser.valid){

      this.onRegister.emit(newUser);
      
      this.idService.setId(idPlayer)
      this.player.createPlayer(id, user)
      this.store.pipe(select(selectPlayers)).subscribe(players => {
        console.log('Jugadores actualizados:', players);
      });
      this.isVisible = false
    }
  }

  getFormErrors(controlName: string): string[] {
    const control = this.formUser.get(controlName);
    if (!control?.errors || (!control.touched && !control.dirty)) return [];
    
    // Define los mensajes de error según el campo
    let errorMessages: { [key: string]: string } = {};
    if (controlName === 'name') {
      errorMessages = {
        required: 'El nombre de la game es requerido.',
        minlength: 'El nombre debe tener al menos 5 caracteres.',
        maxlength: 'El nombre no puede exceder los 20 caracteres.',
        pattern: 'El nombre no puede tener caracteres especiales.',
        maxThreeNumbers: 'El nombre no puede contener más de 3 números.',
        noOnlyNumbers: 'El nombre no puede contener solo números.',
      };
    } else if (controlName === 'views') {
      errorMessages = {
        required: 'Por favor elija una opción.',
      };
    } else {
      errorMessages = {
        required: 'Por favor elija un opción.',
      };
    }
  
    return Object.keys(control.errors).map((errorKey) => errorMessages[errorKey]);
  }
}

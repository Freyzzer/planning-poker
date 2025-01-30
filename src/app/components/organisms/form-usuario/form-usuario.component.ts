import { Component,EventEmitter, Output, Input } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import {FormControl, ReactiveFormsModule, FormGroup, Validators,AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { addPlayer } from '../../../storage/action/game.actions';
import {GameState} from'../../../storage/state/game.state'
import { selectPlayers } from '../../../storage/selectors/game.selectors';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



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
  @Output() onRegister: EventEmitter<{ name: any; views: any }> = new EventEmitter();
  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
  }

  constructor(private readonly route: ActivatedRoute, private readonly fb:FormBuilder, private readonly store:Store<GameState>){
    this.formUser = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9]*$'), // Solo letras y números
        this.maxThreeNumbers(),
        this.noOnlyNumbers()
      ]], // Campo para el nombre de la partida
      views: new FormControl('',[Validators.required])
    })
    this.players$ = this.store.pipe(select(selectPlayers));
  }

  
  onSubmit() {
    const id:string = this.route.snapshot.paramMap.get('id') ?? '';
    const idPlayer = crypto.randomUUID()
    const user = {id:idPlayer,name:this.formUser.value.name, view:this.formUser.value.views, card:null,isAdmin:true}
    const newUser = {
      name: this.formUser.value.name ?? '',
      views: this.formUser.value.views ?? '',
    };
    this.onRegister.emit(newUser);
    if(this.formUser.valid)
    {
      localStorage.setItem('id',idPlayer)
      this.store.dispatch(addPlayer({gameId:id ,player: user }))
      this.store.pipe(select(selectPlayers)).subscribe(players => {
        console.log('Jugadores actualizados:', players);
      });
      this.isVisible = false
    }
  }

  //Validar que no haya mas de 3 numeros
  maxThreeNumbers(){
    return (control: AbstractControl): ValidationErrors | null => {
      const nombre = control.value || ''; // Asegúrate de que sea una cadena vacía si es null o undefined
      const numbers = nombre.match(/\d/g); // Busca los dígitos en la cadena
      if (numbers && numbers.length > 3) {
        return { maxThreeNumbers: true }; // Devuelve un error si hay más de 3 números
      }
      return null; // Si está bien, no hay error
    };
  }

  //Validar que no haya solo numeros
  noOnlyNumbers(){
    return (control: AbstractControl): ValidationErrors | null => {
      const nombre = control.value || '';
      const numbers = nombre.match(/\d/g);
      if (numbers && numbers.length === nombre.length) {
        return { noOnlyNumbers: true };
      }
      return null;
    };
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

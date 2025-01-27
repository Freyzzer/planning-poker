import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators,AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/data.service';
import { Store, select } from '@ngrx/store';
import { createGame } from '../../../storage/action/game.actions';
import {GameState} from'../../../storage/state/game.state'
import { selectGame } from '../../../storage/selectors/game.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-ingreso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonSubmitCustomComponent],
  templateUrl: './form-create-game.component.html'
})

export class FormCreateGameComponent {
  formGame:FormGroup;
  game$: Observable<any>

  constructor(private readonly store:Store<GameState>,private readonly router: Router, private readonly dataService: DataService, private readonly fb:FormBuilder) {
    console.log('Ruta activa:', this.router.url);
    this.formGame = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9]*$'), // Solo letras y números
        this.maxThreeNumbers(),
        this.noOnlyNumbers()
      ]]
    })
    this.game$ = this.store.pipe(select(selectGame))
  }

  onSubmit() {
    const id = crypto.randomUUID()
    const game = {id:id,name:this.formGame.value.name, players:[]};
    if(this.formGame.valid && game)
    {
      this.store.dispatch(createGame({game:game}))
      this.store.pipe(select(selectGame)).subscribe(games => {
              console.log('partida actualizados:', games);
            });
      console.log('Partida ingresada: ', game.name);
      this.dataService.addGame(game)
      console.log('Game', game)
      this.router.navigate([`/game/${id}`]); //redirecciona al usuario a la mesa
      
    }
  }

  //Validar que no haya mas de 3 numeros
  maxThreeNumbers(){
    return (control: AbstractControl): ValidationErrors | null => {
      const partida = control.value || ''; // Asegura de que sea una cadena vacía si es null o undefined
      const numbers = partida.match(/\d/g); // Busca los dígitos en la cadena
      if (numbers && numbers.length > 3) {
        return { maxThreeNumbers: true }; // Devuelve un error si hay más de 3 números
      }
      return null; // Si está bien, no hay error
    };
  }

  //Validar que no haya solo numeros
  noOnlyNumbers(){
    return (control: AbstractControl): ValidationErrors | null => {
      const partida = control.value || '';
      const numbers = partida.match(/\d/g);
      if (numbers && numbers.length === partida.length) {
        return { noOnlyNumbers: true };
      }
      return null;
    };
  }

  getFormErrors(controlName: string): string[] {
    const control = this.formGame.get(controlName);
    if (!control?.errors || (!control.touched && !control.dirty)) return [];
  
    const errorMessages: { [key: string]: string } = {
      required: 'El nombre de la game es requerido.',
      minlength: 'El nombre debe tener al menos 5 caracteres.',
      maxlength: 'El nombre no puede exceder los 20 caracteres.',
      pattern: 'El nombre no puede tener caracteres especiales.',
      maxThreeNumbers: 'El nombre no puede contener más de 3 números.',
      noOnlyNumbers: 'El nombre no puede contener solo números.',
    };
  
    return Object.keys(control.errors).map((errorKey) => errorMessages[errorKey]);
  }
  
}

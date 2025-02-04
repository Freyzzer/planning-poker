import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import { Router } from '@angular/router';
import { GameService } from '../../../../core/services/game.service';
import { FormValidatorService } from '../../../../core/services/formValidator.service';


@Component({
  selector: 'app-form-ingreso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonSubmitCustomComponent],
  templateUrl: './form-create-game.component.html'
})

export class FormCreateGameComponent {
  formGame:FormGroup;
  formErrors: { name?: string } = {};

  constructor(private readonly router: Router, private readonly fb:FormBuilder, private readonly game:GameService, private readonly validator: FormValidatorService) {
    console.log('Ruta activa:', this.router.url);
    this.formGame = this.fb.group({
      name: ['', []] // Solo letras, números y espacios]]
    })
  }

  onSubmit() {
    const id = crypto.randomUUID()
    const name = this.formGame.value.name.trim();
    this.formErrors = {}
    
    const validationError = this.validator.validateForm(name);
    if (validationError) {
      this.formErrors.name = validationError;
      console.log('errores', this.formErrors)
      return;
    }
    
    
    const game = {id:id,name:this.formGame.value.name, players:[]};
    this.game.createGame(game) //Crea la partida
    this.router.navigate([`/game/${id}`]); //redirecciona al usuario a la mesa  
  }

  getFormErrors(controlName: string): string[] {
    const control = this.formGame.get(controlName);
    if (!control?.errors || (!control.touched && !control.dirty)) return [];

    const errorMessages: { [key: string]: string } = {
      required: 'El nombre de la partida es requerido.',
      minlength: 'El nombre debe tener al menos 5 caracteres.',
      maxlength: 'El nombre no puede exceder los 20 caracteres.',
      pattern: 'El nombre solo puede contener letras, números y espacios.',
    };

    return Object.keys(control.errors).map((errorKey) => errorMessages[errorKey] || 'Error desconocido');
  }
}
  


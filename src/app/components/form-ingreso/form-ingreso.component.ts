import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { ButtonSubmitCustomComponent } from '../../button-submit-custom/button-submit-custom.component';


@Component({
  selector: 'app-form-ingreso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonSubmitCustomComponent],
  templateUrl: './form-ingreso.component.html',
  styleUrl: './form-ingreso.component.css'
})
export class FormIngresoComponent {
  formIngreso = new FormGroup({
    partida: new FormControl('', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9]*$'),
      this.maxThreeNumbers(),
      this.noOnlyNumbers()
    ]), // Campo para el nombre de la partida
  });

  onSubmit() {
    const nombrePartida = this.formIngreso.value.partida;
    if(nombrePartida)
    {
      console.log('Partida ingresada: ', nombrePartida);
      alert('Partida ingresada: ' + nombrePartida);
      this.formIngreso.reset(); // Reinicia el formulario
    }
  }

  maxThreeNumbers(){
    return (control: AbstractControl): ValidationErrors | null => {
      const partida = control.value;
      const numbers = partida.match(/\d/g);
      if (numbers && numbers.length > 3) {
        return { maxThreeNumbers: true };
      }
      return null;
    };
  }

  noOnlyNumbers(){
    return (control: AbstractControl): ValidationErrors | null => {
      const partida = control.value;
      const numbers = partida.match(/\d/g);
      if (numbers && numbers.length === partida.length) {
        return { noOnlyNumbers: true };
      }
      return null;
    };
  }
  
}

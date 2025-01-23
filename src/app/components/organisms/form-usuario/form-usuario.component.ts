import { Component,EventEmitter, Output } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import {FormControl, ReactiveFormsModule, FormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonSubmitCustomComponent],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent {
  isVisible:boolean = true;
  @Output() onRegister: EventEmitter<{ nombre: string; tipo: string }> = new EventEmitter();

  formUsuario = new FormGroup({
    nombre: new FormControl('', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      // Validators.pattern('^[a-zA-Z0-9]*$'),
      this.maxThreeNumbers(),
      this.noOnlyNumbers()
    ]), // Campo para el nombre de la partida
    tipo: new FormControl('')
  });
  
  onSubmit() {
    const nombrePartida = this.formUsuario.value.nombre;
    const tipoUsuario = this.formUsuario.value.tipo

    if(nombrePartida && tipoUsuario)
    {
      console.log('Partida ingresada: ', nombrePartida);
      alert('Partida ingresada: ' + nombrePartida);
      this.isVisible = false
      this.formUsuario.reset(); // Reinicia el formulario
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
}

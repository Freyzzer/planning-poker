import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import { Router } from '@angular/router';



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
      // Validators.pattern('^[a-zA-Z0-9]*$'),
      this.maxThreeNumbers(),
      this.noOnlyNumbers()
    ]), // Campo para el nombre de la partida
  });


  constructor(private readonly router: Router) {
    console.log('Ruta activa:', this.router.url);
  }

  onSubmit() {
    const nombrePartida = this.formIngreso.value.partida;
    if(nombrePartida)
    {
      console.log('Partida ingresada: ', nombrePartida);
      alert('Partida ingresada: ' + nombrePartida);
      //logica de direccionamiento
        this.router.navigate(['/game']);
      //
      this.formIngreso.reset(); // Reinicia el formulario
    }
  }

  //Validar que no haya mas de 3 numeros
  maxThreeNumbers(){
    return (control: AbstractControl): ValidationErrors | null => {
      const partida = control.value || ''; // Asegúrate de que sea una cadena vacía si es null o undefined
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
  
}

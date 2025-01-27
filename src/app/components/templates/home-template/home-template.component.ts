import { Component } from '@angular/core';
import { NavbarComponent } from '../../organisms/navbar/navbar.component';
import { FormUsuarioComponent } from '../../organisms/form-usuario/form-usuario.component';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { BodyGameComponent } from '../../organisms/body-game/body-game.component';

@Component({
  selector: 'app-home-template',
  standalone: true,
  imports: [NavbarComponent, BodyGameComponent, FormUsuarioComponent,ReactiveFormsModule],
  templateUrl: './home-template.component.html',
})
export class HomeTemplateComponent {
  formUsuario = new FormGroup({
      name: new FormControl(''), // Campo para el nombre de la partida
      views: new FormControl('')
    });

    isVisible: boolean = false;

    // Método para alternar la visibilidad del formulario
    

    registerPlayer(event: { name: string; views: string }): void {
      this.formUsuario.patchValue({
        name: event.name,
        views: event.views,
      });
  
      // Opcional: Imprimir el valor actual del formulario en la consola
      console.log('Datos del jugador:', this.formUsuario.value);
    }
}

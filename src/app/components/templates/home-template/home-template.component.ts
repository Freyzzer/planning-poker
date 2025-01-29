import { Component } from '@angular/core';
import { NavbarComponent } from '../../organisms/navbar/navbar.component';
import { FormUsuarioComponent } from '../../organisms/form-usuario/form-usuario.component';
import { ReactiveFormsModule} from '@angular/forms';
import { BodyGameComponent } from '../../organisms/body-game/body-game.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-template',
  standalone: true,
  imports: [NavbarComponent, BodyGameComponent, FormUsuarioComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './home-template.component.html',
})
export class HomeTemplateComponent {
    view = '';
    name = ''
    isVisible: boolean = false;

    registerPlayer(event: { name: string | null; views: string | null }): void {
      this.view = event.views ?? '';
      this.name = event.name ?? '';
      // Opcional: Imprimir el valor actual del formulario en la consola
      console.log('Datos del jugador:', event.views); 
    }
}

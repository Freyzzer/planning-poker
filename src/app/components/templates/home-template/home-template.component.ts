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

    isVisible: boolean = false;

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      console.log('asdasfdasafd', this.view)
    }
    // Método para alternar la visibilidad del formulario
    

    registerPlayer(event: { name: string | null; views: string | null }): void {
      this.view = event.views ?? '';
      // Opcional: Imprimir el valor actual del formulario en la consola
      console.log('Datos del jugador:', event.views); 
    }
}

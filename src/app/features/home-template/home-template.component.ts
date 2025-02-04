import { Component} from '@angular/core';
import { FormUsuarioComponent } from '../../shared/components/organisms/form-usuario/form-usuario.component';
import { ReactiveFormsModule} from '@angular/forms';
import { BodyGameComponent } from '../../shared/components/organisms/body-game/body-game.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-template',
  standalone: true,
  imports: [BodyGameComponent, FormUsuarioComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './home-template.component.html',
})
export class HomeTemplateComponent {
    name = ''
    isVisible: boolean = false;
    nameGame = ''
    myView = ''
    view = ''

    registerPlayer(event: {  name: string; views: string}): void {
      this.view = event.views ?? '';
      this.name = event.name ?? '';
      // Opcional: Imprimir el valor actual del formulario en la consola
      console.log('Datos del jugador:', event.views); 
    }

    registerName(event: {name:string}){
      this.nameGame = event.name ?? '';
    }

    getView(event: { view: Observable<string> }): void {
      event.view.subscribe(view => {
        this.myView = view;
        console.log(view); // Aquí manejas el valor emitido por el observable
      });
    }
}

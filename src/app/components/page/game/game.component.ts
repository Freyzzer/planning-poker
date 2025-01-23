import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  nombre:string = ''

  // Mostrar la ventana emergente al cargar la página
  ngOnInit() {
    setTimeout(() => {
      return '<div>dsdsdsdsddsdd </div>'
    }, 500); 
  }// Espera breve antes de mostrar la alerta
}

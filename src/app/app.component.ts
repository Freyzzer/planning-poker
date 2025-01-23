import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormIngresoComponent } from "./components/form-ingreso/form-ingreso.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormIngresoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'plannig-poker';

}

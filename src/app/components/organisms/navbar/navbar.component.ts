import { Component } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonSubmitCustomComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}

import { Component } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import { ProfileComponent } from '../../atoms/profile/profile.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonSubmitCustomComponent, ProfileComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

}

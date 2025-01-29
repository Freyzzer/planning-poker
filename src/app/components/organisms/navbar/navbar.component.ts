import { Component, Input } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import { ProfileComponent } from '../../atoms/profile/profile.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonSubmitCustomComponent, ProfileComponent, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  form:FormGroup;
  isVisible = false;
  url = '';
  @Input() name = '';

  constructor(private readonly fb:FormBuilder, private readonly location: Location){
    this.form = this.fb.group({
      url: new FormControl('',[Validators.required])
    })
  }

  getName():string{
    let letter = ''
    letter = this.name.slice(0, 2).toUpperCase()
    return letter
  }

  onSubmit(){
    this.isVisible = true;
    this.url ='http://localhost:4200' + this.location.path()
    console.log('toma papu',this.url)
  }

  CopyUrl(){
    // Usar la API moderna
    navigator.clipboard.writeText(this.url)
      .then(() => {
        console.log('URL copiada al portapapeles:', this.url);
        alert('URL copiada al portapapeles: ' + this.url);
      })
      .catch((err) => {
        console.error('Error al copiar la URL:', err);
        alert('No se pudo copiar la URL. Inténtalo de nuevo.');
      });
  }



}

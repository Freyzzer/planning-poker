import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import { ProfileComponent } from '../../atoms/profile/profile.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { GameState } from '../../../storage/state/game.state';
import { Observable } from 'rxjs';
import { selectGameById } from '../../../storage/selectors/game.selectors';
import { ActivatedRoute } from '@angular/router';


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
  game$: Observable<any>;
  id = '';
  tittle = ''
  @Output() view = new EventEmitter<{ view: Observable<string> }>(); // ✅ Emitimos el objeto correctamente
  myView: Observable<string> = new Observable<string>();


  constructor(private readonly fb:FormBuilder, private readonly location: Location, private readonly store:Store<GameState>, private readonly route:ActivatedRoute){
    this.form = this.fb.group({
      url: new FormControl('',[Validators.required])
    })

    this.game$ = this.store.pipe(select(selectGameById(this.id)))
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    // Obtener el juego por ID y asignar el nombre de la partida
    this.game$ = this.store.pipe(select(selectGameById(this.id)));
    this.game$.subscribe(game => {
      if (game) {
        this.tittle = game.name; // Asigna el nombre de la partida
      }
    });
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

  closeModal(){
    this.isVisible = false;
  }

  getView(event: { view: Observable<string> }) {
    console.log('View recibido en Navbar:', event.view);
    this.view.emit(event); // ✅ Pasamos el objeto con { view: Observable<string> }
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import { ProfileComponent } from '../../atoms/profile/profile.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Game, GameState } from '../../../../storage/state/game.state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../../../core/services/player.service';
import { GameService } from '../../../../core/services/game.service';
import { IdService } from '../../../../core/services/id.service';
import { selectGame } from '../../../../storage/selectors/game.selectors';

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
  idGame = '';
  idPlayer = ''
  tittle = ''
  @Output() view = new EventEmitter<{ view: string }>(); // ✅ Emitimos el objeto correctamente
  myView: Observable<string> = new Observable<string>();
  game$: Observable<Game[]> | undefined // Observable para obtener la partida
  hasGame: boolean = false; // Variable para controlar la visibilidad del botón
  show = false
  letter = ''
  textButton = 'Copiar'
  

  constructor(private readonly idServices:IdService,private readonly game:GameService,private readonly player:PlayerService,private readonly fb:FormBuilder, private readonly location: Location, private readonly store:Store<GameState>, private readonly route:ActivatedRoute){
    this.form = this.fb.group({
      url: new FormControl('',[Validators.required])
    })

    this.game$ = this.store.pipe(select(selectGame))
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('id game', this.idGame)
    // Obtener la partida desde el servicio
    this.game$ = this.game.getGame();
    
    // Suscribirse al observable para actualizar la variable hasGame
    this.game$?.subscribe((games) => {
      console.log('partidas', games)
      this.idGame = this.route.snapshot.paramMap.get('id') ?? ''
      this.tittle = games[0].name
      if(this.tittle != ''){
        console.log("ssasdasdsadaddddd")
        this.hasGame = true

      }
    });

    // Suscribirse al ID para recibir actualizaciones en tiempo real
    this.idServices.id$.subscribe(id => {
      this.idPlayer = id;
      this.player.getPlayerById(this.idPlayer).subscribe(player => {
        if (player) {
          console.log('Jugador encontrado:', player);
          this.letter = (player.name).slice(0,2).toUpperCase();
        } else {
          console.log('Jugador no encontrado');
        }
      });
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

  CopyUrl(): string{
    // Usar la API moderna
    navigator.clipboard.writeText(this.url)
      
      this.textButton = 'Copiado!'
      setTimeout(() => {
        this.textButton = 'Copiar'
      }, 3000);
      return 'bounce-in-top'
  }

  closeModal(){
    this.isVisible = false;
  }

  getView(event: { view: string }) {
    console.log('View recibido en Navbar:', event.view);
    this.view.emit(event); // ✅ Pasamos el objeto con { view: Observable<string> }
  }

}

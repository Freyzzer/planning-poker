import { Component, Input } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../../core/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../../core/services/game.service';
import { Game } from '../../../../storage/state/game.state';


@Component({
  selector: 'app-body-game',
  standalone: true,
  imports: [TableComponent, CommonModule,],
  templateUrl: './body-game.component.html',
})
export class BodyGameComponent {
  players$: Observable<any>;
  myPlayer$: Observable<any>;
  id = '';
  idGame = '';
  game: Game | null = null;
  @Input() view: string = '';
  @Input() myView: string = '';
  
  constructor(private readonly player:PlayerService, private readonly route: ActivatedRoute, private readonly gameService:GameService, private readonly router: Router){
    this.players$ = this.player.getPlayers()
    this.myPlayer$ = this.player.getPlayerById(this.id)
  }

  onUserRegistered(user: { view: string; name: string }) {
    this.view = user.view;
    console.log('view body,', user.view)
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('view body,', this.view)
    this.id = localStorage.getItem('id') ?? ''
    this.idGame = this.route.snapshot.paramMap.get('id') ?? ''
    if(this.idGame)
    {
     this.gameService.getGame()?.subscribe(game =>{
      if(game.length === 0){
        console.log('ave maria', game)
        this.router.navigate(['/']);
      }
     })
    
  }
}
}

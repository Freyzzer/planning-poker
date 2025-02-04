import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Ajusta el path
import { NavbarComponent } from './shared/components/organisms/navbar/navbar.component';
import { CardComponent } from './shared/components/atoms/card/card.component';
import { PlayerService } from './core/services/player.service';
import { IdService } from './core/services/id.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CardComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  loading: boolean = true; // Variable para controlar la pantalla de transición
  title = 'plannig-poker';
  view = ''
  id= ''

  constructor(private readonly player: PlayerService,private readonly idService: IdService)
  {
    this.id = this.idService.getId()
    console.log('dsds', this.id)
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('be',this.id)
    this.player.getPlayerById(this.id).subscribe(player =>{
      if(player){
        console.log('muchcahos?')
        this.view = player.view ?? '';
      }else{
        console.log('player no encontrado')
      }
    }) 
    
    // Simula la duración de la transición (por ejemplo, 3 segundos)
    setTimeout(() => {
      this.loading = !this.loading;
    }, 3000);
    
  }

  getView(event: {view:string}){
    this.view = event.view
  }

}

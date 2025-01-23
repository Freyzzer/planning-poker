import { Component } from '@angular/core';
import { TableComponent } from '../../atoms/table/table.component';
import { CardComponent } from '../../atoms/card/card.component';


@Component({
  selector: 'app-body-game',
  standalone: true,
  imports: [TableComponent, CardComponent],
  templateUrl: './body-game.component.html',
  styleUrl: './body-game.component.css'
})
export class BodyGameComponent {

}

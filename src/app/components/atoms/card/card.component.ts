import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectCard } from '../../../storage/action/game.actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  scoreOptions = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'];
  selectedCards: number[] = [];
  playerId:string ='';
  
  constructor(private readonly store: Store) {}
  
  onSelectCard(card: string) {
    this.playerId = localStorage.getItem('id') ?? '';
    console.log("selecciono: ", selectCard({ playerId: this.playerId, card }))
    this.store.dispatch(selectCard({ playerId: this.playerId, card }));
  }

  toggleCardSelection(index: number): void {
    if (this.selectedCards) {
      // Remove card from selection
      console.log('Removing card from selection:', index);
       this.scoreOptions.splice(index, 1);
       console.log(this.scoreOptions)
    } else {
      // Add card to selection
      
    }

    console.log('Selected cards:', this.selectedCards);
  }

  handleKeyDown(event: KeyboardEvent): void {
    console.log('Key Down:', event.key);
    // Add custom logic here for key down events
  }

  handleKeyPress(event: KeyboardEvent): void {
    console.log('Key Press:', event.key);
    // Add custom logic here for key press events
  }

  handleKeyUp(event: KeyboardEvent): void {
    console.log('Key Up:', event.key);
    // Add custom logic here for key up events
  }

}

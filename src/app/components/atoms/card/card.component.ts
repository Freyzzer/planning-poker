import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  cards: (string | number)[] = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  selectedCards: number[] = [];

  toggleCardSelection(index: number): void {
    if (this.selectedCards) {
      // Remove card from selection
      console.log('Removing card from selection:', index);
       this.cards.splice(index, 1);
       console.log(this.cards)
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

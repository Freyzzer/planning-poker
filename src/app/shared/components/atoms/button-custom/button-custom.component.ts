import { Component, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button-custom',
  standalone: true,
  imports: [],
  templateUrl: './button-custom.component.html',
})
export class ButtonCustomComponent {
  @Output() reveal: EventEmitter<false> = new EventEmitter();
  isreveal:boolean = false;
  @Input() text:string = 'Revelar Votaciones'

  constructor(){

  }

  onClick() {
    this.reveal.emit(); // Emitir el evento al componente padre
  }
}

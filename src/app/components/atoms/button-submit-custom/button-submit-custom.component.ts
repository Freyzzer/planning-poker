import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'button-submit-custom',
  standalone: true,
  imports: [],
  templateUrl: './button-submit-custom.component.html'
})
export class ButtonSubmitCustomComponent {
  @Input() text: string = '';
  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit(); // Emitir el evento al componente padre
  }
}

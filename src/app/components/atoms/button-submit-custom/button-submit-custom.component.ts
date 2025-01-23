import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'button-submit-custom',
  standalone: true,
  imports: [],
  templateUrl: './button-submit-custom.component.html',
  styleUrl: './button-submit-custom.component.css'
})
export class ButtonSubmitCustomComponent {
  @Input() text: string = 'Submit';
  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit(); // Emitir el evento al componente padre
  }
}

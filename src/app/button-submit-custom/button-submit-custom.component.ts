import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-submit-custom',
  standalone: true,
  imports: [],
  templateUrl: './button-submit-custom.component.html',
  styleUrl: './button-submit-custom.component.css'
})
export class ButtonSubmitCustomComponent {
  @Input() text: string = 'Submit';
}

import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() label!: string;

  public keyUp(event: any) {
    this.control.setValue(event.target.value);
  }
}

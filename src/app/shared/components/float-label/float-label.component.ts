import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-float-label',
  templateUrl: './float-label.component.html',
  styleUrl: './float-label.component.css'
})
export class FloatLabelComponent {

  @Input() inputId!: string;
  @Input() inputType!: string;
  @Input() inputValue!: string;
  @Input() label!: string;

}

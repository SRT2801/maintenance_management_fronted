import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() text: string = 'Click me';
  @Input() route: string | null = null;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClick() {
    this.buttonClick.emit();
    if (this.route) {
      this.router.navigate([this.route]);  
    }
  }
}

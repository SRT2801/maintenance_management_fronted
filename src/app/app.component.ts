import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  sidebarVisible: boolean = false;

  constructor(public router: Router) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onSidebarVisibleChange(visible: boolean) {
    this.sidebarVisible = visible;
  }
}

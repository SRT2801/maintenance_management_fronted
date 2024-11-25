import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  items!: MenuItem[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  closeSidebar() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeSidebar();
  }

  logout() {
    this.authService.logout();
    this.authService.logoutObservable.subscribe(() => {
      this.toastService.showSuccess('Success', 'Logout successfully');
      this.router.navigate(['/login']);
      this.closeSidebar();
    });
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Register',
            icon: '',
            items: [
              {
                label: 'Actors',
                icon: 'pi pi-user-plus',
                command: () => this.navigateTo('/register'),
              },
            ],
          },
          {
            label: 'View Users',
            items: [
              {
                label: 'All Users',
                icon: 'pi pi-users',
                command: () => this.navigateTo('/users'),
              },
            ],
          },
        ],
      },

      {
        label: 'Departments',
        icon: 'pi pi-building-columns',
        items: [
          {
            label: 'View Deparments',
            items: [
              {
                label: 'All Departments',
                icon: 'pi pi-home',
                command: () => this.navigateTo('/department'),
              },
            ],
          },
        ],
      },

      {
        label: 'Request',
        icon: 'pi pi-file-edit',
        items: [
          {
            label: 'Create Request',
            icon: '',
            command: () => this.navigateTo('request'),
          },
        ],
      },

      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },

      {
        label: 'Upload Files',
        icon: 'pi pi-file-arrow-up',
        command: () => this.navigateTo('uploadfile'),
      },
    ];
  }
}

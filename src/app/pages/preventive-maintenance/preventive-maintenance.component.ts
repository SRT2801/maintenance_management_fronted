import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http/http.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Router } from '@angular/router';

interface IPreventiveMaintenance {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  status: string;
  deptMaintTypeAssignment: {
    id: number;
    department: {
      id: number;
      name: string;
      description: string;
    };
    maintenanceType: {
      id: number;
      name: string;
      description: string;
    };
  };
}

@Component({
  selector: 'app-preventive-maintenance',
  templateUrl: './preventive-maintenance.component.html',
  styleUrls: ['./preventive-maintenance.component.css']
})
export class PreventiveMaintenanceComponent implements OnInit {
  preventiveMaintenances: IPreventiveMaintenance[] = [];
  isLoading = false;

  constructor(
    private readonly _httpSrv: HttpService,
    private readonly _toastSrv: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPreventiveMaintenances();
  }

  private loadPreventiveMaintenances() {
    this.isLoading = true;
    this._httpSrv.get<{message: string, data: IPreventiveMaintenance[]}>('maintenance/preventive').subscribe({
      next: (response) => {
        console.log('Mantenimientos preventivos recibidos:', response.data);
        this.preventiveMaintenances = response.data;
      },
      error: (err) => {
        console.error('Error loading preventive maintenances:', err);
        this._toastSrv.showError('Error', 'Failed to load preventive maintenances');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/preventive-maintenance-details', id]);
  }
}

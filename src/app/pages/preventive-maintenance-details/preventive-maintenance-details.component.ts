import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../shared/services/http/http.service';
import { ToastService } from '../../shared/services/toast/toast.service';

interface IPreventiveMaintenance {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface IMaintenanceStage {
  id: number;
  name: string;
  description: string;
  order: number;
}

@Component({
  selector: 'app-preventive-maintenance-details',
  templateUrl: './preventive-maintenance-details.component.html',
  styleUrls: ['./preventive-maintenance-details.component.css']
})
export class PreventiveMaintenanceDetailsComponent implements OnInit {
  maintenance: IPreventiveMaintenance | null = null;
  stages: IMaintenanceStage[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private _httpSrv: HttpService,
    private _toastSrv: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMaintenanceDetails(parseInt(id));
      this.loadStages();
    }
  }

  loadMaintenanceDetails(id: number) {
    this.isLoading = true;
    this._httpSrv.get<{message: string, data: IPreventiveMaintenance}>(`maintenance/${id}`).subscribe({
      next: (response) => {
        this.maintenance = response.data;
        console.log(response.data)
      },
      error: (err) => {
        this._toastSrv.showError('Error', 'Failed to load maintenance details');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loadStages() {
    this._httpSrv.get<{message: string, data: IMaintenanceStage[]}>('stage').subscribe({
      next: (response) => {
        this.stages = response.data;
      },
      error: (err) => {
        this._toastSrv.showError('Error', 'Failed to load stages');
      }
    });
  }

  updateStageAndStatus(stageId: number, status: string) {
    if (!this.maintenance) return;

    const updateData = {
      stage: stageId,
      status: status
    };

    this._httpSrv.patch(`maintenance/preventive/${this.maintenance.id}`, updateData).subscribe({
      next: () => {
        this._toastSrv.showSuccess('Success', 'Maintenance updated successfully');
        this.loadMaintenanceDetails(this.maintenance!.id);
      },
      error: (err) => {
        this._toastSrv.showError('Error', 'Failed to update maintenance');
      }
    });
  }
}

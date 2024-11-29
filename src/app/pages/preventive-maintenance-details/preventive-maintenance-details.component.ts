import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../shared/services/http/http.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { lastValueFrom } from 'rxjs';

interface IPreventiveMaintenance {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  deptMaintTypeAssignment: {
    id: number;
    status: string;
    priority: number;
    comments: string;
    department: {
      id: number;
      name: string;
      description: string;
      phoneNumber: string;
      status: string;
    };
    maintenanceType: {
      id: number;
      name: string;
      description: string;
    };
  };
  executions: Array<{
    id: number;
    status: string;
    description: string | null;
    startedAt: string;
    updatedAt: string;
    endedAt: string | null;
    stage: {
      id: number;
      name: string;
      description: string;
      order: number;
      createdAt: string;
      updatedAt: string;
    };
    executors: Array<{
      id: number;
      assignedAt: string;
      updatedAt: string;
      status: string;
      comments: string | null;
      actor: {
        id: number;
        name: string;
        lastName: string;
        phoneNumber: string;
        documentNumber: number;
        documentType: string;
        createdAt: string;
        updatedAt: string;
        status: string;
      };
    }>;
  }>;
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
  selectedStage: number | null = null;
  uploadedFile: string | null = null;

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
  selectStage(stageId: number) {
    this.selectedStage = stageId;
  }


  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', 'completed');

      this.isLoading = true;
      try {
        const fileResponse = await lastValueFrom(
          this._httpSrv.post<{ message: string; data: string }>(
            'file/upload/',
            formData
          )
        );

        this.uploadedFile = fileResponse.data;
        this._toastSrv.showSuccess('Éxito', 'Archivo subido correctamente');


        if (this.selectedStage) {
          this.updateStageAndStatus(this.selectedStage, 'in_progress');
        }
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        this._toastSrv.showError('Error', 'No se pudo subir el archivo');
      } finally {
        this.isLoading = false;
      }
    }
  }


  updateStageAndStatus(stageId: number, status: string) {
    if (!this.maintenance || !this.uploadedFile) {
      this._toastSrv.showError('Error', 'Por favor, sube el formulario completado');
      return;
    }

    const executionId = this.maintenance.executions[0]?.id;
    if (!executionId) {
      this._toastSrv.showError('Error', 'No hay ejecución disponible');
      return;
    }

    
    const updateData = {
      maintenance: {
        name: this.maintenance.name,
        description: this.maintenance.description
      },
      stage: stageId,
      completedForm: {
        filePath: this.uploadedFile
      }
    };

    this.isLoading = true;


    this._httpSrv.patch(`maintenance/preventive/${stageId}`, updateData).subscribe({
      next: (response) => {
        this._toastSrv.showSuccess('Éxito', 'Etapa actualizada correctamente');
        this.loadMaintenanceDetails(this.maintenance!.id);
        this.selectedStage = null;
        this.uploadedFile = null;
      },
      error: (err) => {
        console.error('Error al actualizar la etapa:', err);
        this._toastSrv.showError('Error', 'No se pudo actualizar la etapa');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

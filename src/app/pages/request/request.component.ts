import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../shared/services/http/http.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { IRequest } from '../../interfaces/IRequest';
import { Department, IDepartment } from '../../interfaces/IDepartment';
import { IActor } from '../../interfaces/IActor';
import { MaintenanceType } from '../../enums/maintenanceType/MaintenanceType';
import { AuthService } from '../../shared/services/auth/auth.service';
import { IAuthResponse } from '../../interfaces/IAuthResponse';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import {
  IMaintenanceType,
  IMaintenanceTypeResponse,
} from '../../interfaces/IMaintenanceTypesResponse';
import { IAssignmentResponse } from '../../interfaces/IAssignmentResponse';

interface State {
  status: string;
}
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
})
export class RequestComponent {
  public requestForm!: FormGroup;
  public departments!: IDepartment;
  public actor!: IActor;
  public currentActor!: IAuthResponse;
  public maintenanceType!: any;
  public selectedDepartment!: any[];
  loading = true;
  error = false;
  isLoading = false;
  status!: State[];
  selectedMaintType!: IMaintenanceType[];
  private uploadedFile: string | null = null;

  constructor(
    private readonly _httpSrv: HttpService,
    private readonly _toastSrv: ToastService,
    private readonly _authSrv: AuthService
  ) {}

  get nameControl() {
    return this.requestForm.get('name') as FormControl;
  }

  get descriptionControl() {
    return this.requestForm.get('description') as FormControl;
  }

  get typeMaintenanceControl() {
    return this.requestForm.get('maintenanceType') as FormControl;
  }

  async ngOnInit() {
    this.initForm();
    await this.getAuthData();
    await this.loadMaintenanceType();

    this.selectedDepartment = [this.currentActor.data.actor.department];
    this.selectedMaintType = this.maintenanceType.data;

    this.requestForm.patchValue({
      department: this.currentActor.data.actor.department,
    });
  }

  async onSubmit() {
    if (this.requestForm.valid) {
      const departmentId = this.requestForm.get('department')?.value.id;
      const maintenanceTypeId =
        this.requestForm.get('maintenanceType')?.value.id;

      const formValue = this.requestForm.value;
      console.log('Form value:', formValue);
      const savedAssignment = await this.doAssignment(
        departmentId,
        maintenanceTypeId
      );

      const request: IRequest = {
        name: formValue.name,
        description: formValue.description,
        deptMaintTypeAssignment: savedAssignment.data.id,
      };

      this.saveRequest(request);
    } else {
      console.error('Invalid form', this.requestForm.errors);
    }
  }

  protected async saveRequest(body: IRequest) {
    this.isLoading = true;
    const loadingDuration = 2000;
    const startLoadingTime = Date.now();

    const maintenanceType = this.requestForm.get('maintenanceType')?.value?.name?.toLowerCase();

    if (maintenanceType === MaintenanceType.PREVENTIVE) {
      // Verificar que se haya subido un archivo
      if (!this.uploadedFile) {
        this._toastSrv.showError('Error', 'Please upload a completed form file');
        this.isLoading = false;
        return;
      }

      const preventiveBody = {
        maintenance: {
          name: body.name,
          description: body.description
        },
        completedForm: {
          filePath: this.uploadedFile // Usar la URL del archivo subido
        }
      };

      this._httpSrv.post<IRequest>('maintenance/preventive/', preventiveBody).subscribe({
        next: (res) => {
          console.log('Mantenimiento preventivo registrado:', res);
          this.requestForm.reset();
          this._toastSrv.showSuccess('Success', 'Preventive maintenance created successfully');
        },
        error: (err) => {
          console.error('Error al registrar mantenimiento preventivo:', err.error);
          this._toastSrv.showError('Error', 'Error registering preventive maintenance');
          this.isLoading = false;
        },
        complete: () => {
          const elapsedTime = Date.now() - startLoadingTime;
          const remainingTime = loadingDuration - elapsedTime;
          if (remainingTime > 0) {
            setTimeout(() => {
              this.isLoading = false;
            }, remainingTime);
          } else {
            this.isLoading = false;
          }
        }
      });
    } else {

      this._httpSrv.post<IRequest>('maintenance/', body).subscribe({
        next: (res) => {
          console.log('Solicitud registrada exitosamente:', res);
          this.requestForm.reset();
          this._toastSrv.showSuccess('Success', 'Maintenance request created successfully');
        },
        error: (err) => {
          console.error('Error al registrar la solicitud:', err.error);
          this._toastSrv.showError('Error', 'Error registering');
          this.isLoading = false;
        },
        complete: () => {
          const elapsedTime = Date.now() - startLoadingTime;
          const remainingTime = loadingDuration - elapsedTime;
          if (remainingTime > 0) {
            setTimeout(() => {
              this.isLoading = false;
            }, remainingTime);
          } else {
            this.isLoading = false;
          }
        }
      });
    }
  }

  private initForm() {
    this.requestForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      maintenanceType: new FormControl(null, [Validators.required]),
      status: new FormControl(''),
      department: new FormControl(null, Validators.required),
    });
  }

  private async doAssignment(departmentId: number, maintenanceTypeId: number) {
    try {
      const body = {
        department: departmentId,
        maintenanceType: maintenanceTypeId,
      };

      return lastValueFrom(this._httpSrv.post<IAssignmentResponse>('dept-maint-type-assignment', body));
    } catch (error) {
      throw error;
    }
  }

  private async loadMaintenanceType() {
    try {
      const response = await firstValueFrom(
        this._httpSrv.get<IMaintenanceTypeResponse>('maintenances-type')
      );
      this.maintenanceType = response;
    } catch (error) {
      throw error;
    }
  }

  private async getAuthData() {
    try {
      const authData = await this._authSrv.getAuthData();
      this.currentActor = authData;
    } catch (error) {
      throw error;
    }
  }

  isPreventiveMaintenance(): boolean {
    return this.requestForm.get('maintenanceType')?.value?.name?.toLowerCase() === MaintenanceType.PREVENTIVE;
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Crear FormData con el archivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', 'completed');

      try {
        // Subir el archivo y obtener la URL
        const fileResponse = await firstValueFrom(
          this._httpSrv.post<{message: string, data: string}>('file/upload/', formData)
        );

        // Guardar la URL del archivo
        this.uploadedFile = fileResponse.data;
        this._toastSrv.showSuccess('Success', 'File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        this._toastSrv.showError('Error', 'Failed to upload file');
      }
    }
  }
}

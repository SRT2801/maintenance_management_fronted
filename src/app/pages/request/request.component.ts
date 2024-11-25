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

    this._httpSrv.post<IRequest>('maintenances/', body).subscribe({
      next: (res) => {
        console.log('Solicitud registrada exitosamente:', res);
        this.requestForm.reset();
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
            this._toastSrv.showSuccess(
              'Success',
              'request created successfully'
            );
          }, remainingTime);
        } else {
          this.isLoading = false;
          this._toastSrv.showSuccess('Success', 'request created successfully');
        }
      },
    });
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
        this._httpSrv.get<IMaintenanceTypeResponse>('maintenances-types')
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
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../shared/services/http/http.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { IRequest } from '../../interfaces/IRequest';
import { Department, IDepartment } from '../../interfaces/IDepartment';
import { IActor } from '../../interfaces/IActor';
import { MaintenanceType } from '../../enums/maintenanceType/MaintenanceType';

interface TypeMaintenance {
  name: string;
}

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
  loading = true;
  error = false;
  isLoading = false;
  selectedDepartments!: Department[];
  status!: State[];
  typeMaintenance!: TypeMaintenance[];
  selectedMaintType!: TypeMaintenance[];

  constructor(
    private readonly _httpSrv: HttpService,
    private readonly _toastSrv: ToastService
  ) {}

  get nameControl() {
    return this.requestForm.get('name') as FormControl;
  }

  get descriptionControl() {
    return this.requestForm.get('description') as FormControl;
  }

  get typeMaintenanceContol() {
    return this.requestForm.get('typeMaintenance') as FormControl;
  }

  ngOnInit() {
    this.getDepartments();

    this.requestForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      typeMaintenance: new FormControl('', [Validators.required]),
      status: new FormControl('' /* [Validators.required] */),
      department: new FormControl('', Validators.required),
    });

    this.selectedDepartments = [
      {
        id: 1,
        name: '',
        description: '',
        phoneNumber: '',
        coordinator: this.actor,
      },
    ];

    this.selectedMaintType = [
      { name: MaintenanceType.CORRECTIVE },
      { name: MaintenanceType.PREVENTIVE },
    ];
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      const request: IRequest = {
        name: formValue.name,
        description: formValue.description,
        deptMaintTypeAssignment: 2,
      };

      this.saveRequest(request);
    } else {
      console.error('Formulario Invalido', this.requestForm.errors);
    }
  }

  protected async saveRequest(body: IRequest) {
    this.isLoading = true;

    const loadingDuration = 2000;
    const startLoadingTime = Date.now();

/*     const assignmentBody = {
      status: '',
      priority: 1,
      comments: '',
      department: 1,
      maintenanceType: 1,
    }; */


    this._httpSrv.post<IRequest>('maintenances/', body).subscribe({
      next: (res) => {
        console.log('Solicitud registrada exitosamente:', res);
        this.requestForm.reset();
      },
      error: (err) => {
        console.error('Error al registrar la solicitud:', err.error);
        this._toastSrv.showError('Error' ,'Error registering');
        this.isLoading = false;
      },
      complete: () => {
        const elapsedTime = Date.now() - startLoadingTime;
        const remainingTime = loadingDuration - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => {
            this.isLoading = false;
            this._toastSrv.showSuccess('Success' ,'request created successfully');
          }, remainingTime);
        } else {
          this.isLoading = false;
          this._toastSrv.showSuccess('Success' ,'request created successfully');
        }
      },
    });
  }

  protected async getDepartments() {
    this.loading = true;

    this._httpSrv.get<IDepartment>('departments/').subscribe({
      next: (data) => {
        this.departments = data;
        this.selectedDepartments = this.departments.data;
        this.loading = false;
        console.log('Departamentos cargados:', this.selectedDepartments);
      },
      error: (err) => {
        console.error('Error cargando departamentos:', err);
        this.error = true;
        this.loading = false;
      },
    });
  }
}

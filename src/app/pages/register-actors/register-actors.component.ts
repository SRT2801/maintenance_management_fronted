import { Component, ViewChild } from '@angular/core';
import { IRole, Role } from '../../interfaces/IRole';
import { HttpService } from '../../shared/services/http/http.service';
import { IActor } from '../../interfaces/IActor';
import { DocumentType } from '../../enums/actor/DocumentType';
import { Status } from '../../enums/actor/Status';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department, IDepartment } from '../../interfaces/IDepartment';
import { ToastService } from '../../shared/services/toast/toast.service';

interface Document {
  name: string;
}

interface State {
  status: string;
}

@Component({
  selector: 'app-register-actors',
  templateUrl: './register-actors.component.html',
  styleUrls: ['./register-actors.component.css'],
})
export class RegisterActorsComponent {
  public roles!: IRole;
  public actor!: IActor;

  public registerForm!: FormGroup;
  public departments!: IDepartment;
  selectedDepartments!: Department[];
  loading = true;
  error = false;
  isLoading = false;

  documents!: Document[];
  selectedDocuments!: Document[];
  selectedRoles!: Role[];

  status!: State[];

  constructor(
    private readonly _httpSrv: HttpService,
    private readonly _toastSrv: ToastService
  ) {}

  get nameControl() {
    return this.registerForm.get('name') as FormControl;
  }

  get lastNameControl() {
    return this.registerForm.get('last_name') as FormControl;
  }

  get phoneControl() {
    return this.registerForm.get('phone_number') as FormControl;
  }

  get emailControl() {
    return this.registerForm.get('email') as FormControl;
  }

  get documentNumberControl() {
    return this.registerForm.get('document_number') as FormControl;
  }

  ngOnInit() {
    this.getRoles();
    this.getDepartments();

    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      document_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      document_type: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
    });

    this.documents = [
      { name: DocumentType.CC },
      { name: DocumentType.CE },
      { name: DocumentType.PB },
      { name: DocumentType.RC },
    ];

    this.status = [
      { status: Status.ACTIVE },
      { status: Status.INACTIVE },
      { status: Status.SUSPENDED },
    ];

    this.selectedDepartments = [
      {
        id: 1,
        name: '',
        description: '',
        phoneNumber: '',
        coordinator: this.actor,
      },
    ];
  }

  protected async getRoles() {
    this._httpSrv.get<IRole>('roles/').subscribe({
      next: (data) => {
        this.roles = data;
        this.selectedRoles = this.roles.data;
        console.log('Roles cargados:', this.selectedRoles);
      },
      error(err) {
        console.error('Error al obtener roles:', err);
      },
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const actor: IActor = {
        name: formValue.name,
        lastName: formValue.last_name,
        phoneNumber: formValue.phone_number,
        email: formValue.email,
        documentNumber: formValue.document_number,
        documentType: formValue.document_type.name,
        status: formValue.status.status,
        role: formValue.role.id,
        department: formValue.department.id,
      };

      this.saveActors(actor);
    } else {
      console.error('El formulario es inválido:', this.registerForm.errors);
      this._toastSrv.showError('Error', 'Please fill out all required fields.');
    }
  }

  protected async saveActors(body: IActor) {
    this.isLoading = true;

    const loadingDuration = 2000;
    const startLoadingTime = Date.now();

    this._httpSrv.post<IActor>('actors/', body).subscribe({
      next: (res) => {
        console.log('Actor registrado exitosamente:', res);
        this.registerForm.reset();
      },
      error: (err) => {
        console.error('Error al registrar actor:', err.error);

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
              'Actor registered successfully.'
            );
          }, remainingTime);
        } else {
          this.isLoading = false;
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
        this._toastSrv.showError('Error', 'Failed to load departments.');
      },
    });
  }
}

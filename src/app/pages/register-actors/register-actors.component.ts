import { Component } from '@angular/core';
import { IRole, Role } from '../../interfaces/IRole';
import { HttpService } from '../../shared/services/http/http.service';
import { IActor } from '../../interfaces/IActor';
import { DocumentType } from '../../enums/actor/DocumentType';
import { Status } from '../../enums/actor/Status';
import { FormGroup, FormControl, Validators } from '@angular/forms';
interface Document {
  name: string;
}


interface State {
  status: string;
}
@Component({
  selector: 'app-register-actors',
  templateUrl: './register-actors.component.html',
  styleUrl: './register-actors.component.css',
})
export class RegisterActorsComponent {
  constructor(private readonly _httpSrv: HttpService) {}
  public roles!: IRole;
  public actor!: IActor;
  public registerForm!: FormGroup;

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
  value!: string;

  documents!: Document[];
  selectedDocuments!: Document[];
  selectedRoles!: Role[];

  status!: State[];
  selectedStatus!: State[];

  ngOnInit() {
    this.getRoles();

    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      document_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]),
      document_type: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });

    this.documents = [
      { name: DocumentType.CC },
      { name: DocumentType.CE },
      { name: DocumentType.PB },
      { name: DocumentType.RC },
    ];

    /* this.roles = [
      { role: 'System Assitant' },
      { role: 'System Auxiliary' },
    ]; */

    this.status = [
      { status: Status.ACTIVE },
      { status: Status.INACTIVE },
      { status: Status.SUSPENDED },
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
      console.log('Formulario válido:', formValue);

      const actor: IActor = {
        name: formValue.name,
        last_name: formValue.last_name,
        phone_number: formValue.phone_number,
        email: formValue.email,
        document_number: formValue.document_number,
        document_type: formValue.document_type.name,
        status: formValue.status.status,
        role: formValue.role.id
      };

      this.saveActors(actor);
    } else {
      console.error('El formulario es inválido:', this.registerForm.errors);
    }
  }

  //Debes pasarle el body, imagino será con lo del form.value quizá, ese sería el body (el json, con el cuerpo del actor, debe ser el de la interfaz)
  protected async saveActors(body: IActor) {
  this._httpSrv.post<IActor>('actors/', body).subscribe({
    next: (res) => {
      console.log('Actor registrado exitosamente:', res);
    },
    error: (err) => {
      console.error('Error al registrar actor:', err.error);
    },
  });
}
}

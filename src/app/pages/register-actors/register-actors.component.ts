import { Component } from '@angular/core';
import { IRole } from '../../interfaces/IRole';
import { HttpService } from '../../shared/services/http/http.service';
import { IActor } from '../../interfaces/IActor';
interface Document {
  name: string;
}

interface Role {
  role: string;
}
interface State {
  status: string;
}
@Component({
  selector: 'app-register-actors',
  templateUrl: './register-actors.component.html',
  styleUrl: './register-actors.component.css'
})
export class RegisterActorsComponent {
  constructor(private readonly _httpSrv: HttpService) {}
  public roles!: IRole;
  public actor!: IActor;

  value!: string;
  name!: string;
  lastName!: string;
  phone!: number;
  email!: string;
  document!: number;
  documentType!: string;

  documents!: Document[];
  selectedDocuments!: Document[];
  selectedRoles!: Role[];

  status!: State[]
  selectedStatus!: State[];

  ngOnInit() {
    this.getRoles()

    this.documents = [
      { name: 'Cédula de ciudadanía' },
      { name: 'Cédula de extranjería' },
      { name: 'Pasaporte' },
      { name: 'Registro civil' },
    ];

    /* this.roles = [
      { role: 'System Assitant' },
      { role: 'System Auxiliary' },
    ]; */

    this.status = [
      { status: 'Active' },
      { status: 'Inactive' },
      { status: 'Suspended' },
    ];
  }

  protected async getRoles() {
    this._httpSrv.get<IRole>('roles/').subscribe({
      next: (data) => {
        this.roles = data;
        const roles = this.roles.data;
        console.log('🚀 ~ HomeComponent ~ getRoles ~ roles:', roles);
      },
      error(err) {
        console.error(err);
      },
    });
  }

  //Debes pasarle el body, imagino será con lo del form.value quizá, ese sería el body (el json, con el cuerpo del actor, debe ser el de la interfaz)
  protected async saveActors(body: IActor) {
    this._httpSrv.post<IActor>('actors/', body).subscribe(res => {
      console.log(res);
    })
  }
}

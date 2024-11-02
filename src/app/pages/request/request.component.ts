import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../shared/services/http/http.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { IRequest } from '../../interfaces/IRequest';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  public requestForm!: FormGroup;
  loading = true;
  error = false;
  isLoading = false;

  constructor(
    private readonly _httpSrv: HttpService,
    private readonly _toastSrv: ToastService
  ) {}

  get nameControl(){
    return this.requestForm.get('name') as FormControl;
  }

  get descriptionControl(){
    return this.requestForm.get('description') as FormControl;
  }

  get typeMaintenanceContol(){
    return this.requestForm.get('typeMaintenance') as FormControl;
  }

  ngOnInit() {

    this.requestForm = new FormGroup ({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      typeMaintenance: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    

    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      const request: IRequest = {
        name: formValue.name,
        description: formValue.description,
        status: formValue.status,
        id: formValue.id,
        assignedAt: formValue.date,
        updatedAt: formValue.date,
        typeMaintenance: ''
      };


      this.saveRequest(request)
    }else{
      console.error('Formulario Invalido', this.requestForm.errors);
    }
  }




  protected async saveRequest(body: IRequest) {
    this.isLoading = true;

    const loadingDuration = 2000;
    const startLoadingTime = Date.now();

    this._httpSrv.post<IRequest>('maintenances/', body).subscribe({
      next: (res) => {
        console.log('Actor registrado exitosamente:', res);
        this.requestForm.reset();
      },
      error: (err) => {
        console.error('Error al registrar la solicitud:', err.error);
        this._toastSrv.showToast('Error al registrar');
        this.isLoading = false;
      },
      complete: () => {
        const elapsedTime = Date.now() - startLoadingTime;
        const remainingTime = loadingDuration - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => {
            this.isLoading = false;
            this._toastSrv.showToast('Registro exitoso');
          }, remainingTime);
        } else {
          this.isLoading = false;
          this._toastSrv.showToast('Registro exitoso');
        }
      },
    });
  }

}

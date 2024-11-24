import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get emailControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loadingDuration = 2000;
      const startLoadingTime = Date.now();

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          console.log('Login exitoso, redirigiendo...');
          this.toastService.showSuccess('Success', 'Login Successfully');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error en el login:', err);
          this.toastService.showError('Error en el login', 'Invalid credentials');
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
      console.error('Formulario inválido', this.loginForm.errors);
      this.toastService.showError('Error', 'Por favor, complete todos los campos requeridos.');
    }
  }
}

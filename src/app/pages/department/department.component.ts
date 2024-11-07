import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http/http.service';
import { Department, IDepartment } from '../../interfaces/IDepartment';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {
  constructor(private readonly _httpSrv: HttpService) {}

  public departments!: IDepartment;
  selectedDepartments!: Department[];
  loading = true;
  error = false;

  ngOnInit() {
    this.getDepartments();
  }

  public async getDepartments() {
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

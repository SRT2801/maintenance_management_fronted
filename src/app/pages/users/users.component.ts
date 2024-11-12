import { Component } from '@angular/core';
import { IActor } from '../../interfaces/IActor';
import { HttpService } from '../../shared/services/http/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  actors: IActor[] = [];
  totalRecords: number = 0;
  currentPage: number = 0;
  rows: number = 10;

  searchText: string = '';

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'phoneNumber', header: 'Phone Number' },
    { field: 'email', header: 'Email' },
    { field: 'documentNumber', header: 'Document Number' },
    { field: 'documentType', header: 'Document Type' },
    { field: 'status', header: 'Status' },
    { field: 'role.name', header: 'Role' },
    { field: 'department.name', header: 'Department' }
  ];

  constructor(private readonly _httpSrv: HttpService) {}

  ngOnInit(): void {
    this.loadActors(this.currentPage, this.rows);
  }

  loadActors(page: number, limit: number) {
    this.currentPage = page;
    this.rows = limit;

    let url = `actors/?page=${page + 1}&limit=${limit}`;
    if (this.searchText) {
      url += `&search=${this.searchText}`;
    }

    this._httpSrv.get<{ data: IActor[], total: number }>(url).subscribe({
      next: (response) => {
        this.actors = response.data;
        this.totalRecords = response.total;
      },
      error: (err) => {
        console.error('Error al obtener actores:', err);
      }
    });
  }

  onPageChange(event: { page: number; rows: number }) {
    if (event.rows !== this.rows) {
      this.loadActors(0, event.rows);
    } else {
      this.loadActors(event.page, event.rows);
    }
  }

  onSearchChange(event: any) {
    this.searchText = event.target.value;
    this.loadActors(this.currentPage, this.rows); 
  }
}

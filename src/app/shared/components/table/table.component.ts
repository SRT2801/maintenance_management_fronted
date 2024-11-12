import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() totalRecords: number = 0;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() rows: number = 5;
  @Input() columns: { field: string; header: string }[] = [];
  @Input() globalSearch: string = '';

  @Output() onPageChange = new EventEmitter<{ page: number; rows: number }>();

  filteredData: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.filteredData = this.data;
  }

  ngOnChanges(): void {
    this.applyFilter();
  }

  handlePageChange(event: any) {
    this.onPageChange.emit({
      page: event.page,
      rows: event.rows
    });
  }

  applyFilter() {
    if (this.globalSearch) {
      this.filteredData = this.data.filter((item) => {
        return this.columns.some((col) => {
          const value = this.getNestedValue(item, col.field);
          return value ? value.toString().toLowerCase().includes(this.globalSearch.toLowerCase()) : false;
        });
      });
    } else {
      this.filteredData = this.data; 
    }
  }

  getNestedValue(data: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], data);
  }
}

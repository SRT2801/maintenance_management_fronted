import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterActorsComponent } from '../pages/register-actors/register-actors.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { DepartmentComponent } from '../pages/department/department.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { RequestComponent } from '../pages/request/request.component';

import { TableModule } from 'primeng/table';
import { UsersComponent } from '../pages/users/users.component';
import { TableComponent } from './components/table/table.component';

const DECLARATIONS = [
  HeaderComponent,
  SidebarComponent,
  CardComponent,
  SidebarComponent,
  DropdownComponent,
  RegisterActorsComponent,
  InputComponent,
  ButtonComponent,
  DepartmentComponent,
  LoadingSpinnerComponent,
  RequestComponent,
  UsersComponent,
];

const IMPORTS = [
  CommonModule,
  CardModule,
  ButtonModule,
  FloatLabelModule,
  InputTextModule,
  SidebarModule,
  PanelMenuModule,
  DropdownModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserModule,
  BrowserAnimationsModule,
  MatProgressSpinnerModule,
  ProgressSpinnerModule,
  ToastModule,
  RippleModule,
  MatSnackBarModule,
  InputTextModule,
  ToastModule,
  TableModule,
];

const EXPORTS = [
  CardComponent,
  SidebarComponent,
  HeaderComponent,
  DropdownComponent,
  InputComponent,
  ButtonComponent,
  ToastModule,
];

@NgModule({
  declarations: [...DECLARATIONS, TableComponent],
  imports: [...IMPORTS],
  exports: [...EXPORTS],
  providers: [MessageService],
})
export class SharedModule {}

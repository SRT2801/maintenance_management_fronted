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

const DECLARATIONS = [
  HeaderComponent,
  SidebarComponent,
  CardComponent,
  SidebarComponent,
  DropdownComponent,
  RegisterActorsComponent,
  InputComponent,
  ButtonComponent
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

];

const EXPORTS = [
  CardComponent,
  SidebarComponent,
  HeaderComponent,
  DropdownComponent,
  InputComponent,
  ButtonComponent
];

@NgModule({
  declarations: [...DECLARATIONS, InputComponent, ButtonComponent],
  imports: [...IMPORTS],
  exports: [...EXPORTS],
})
export class SharedModule {}

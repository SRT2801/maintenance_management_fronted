import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelComponent } from './components/float-label/float-label.component';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    CardComponent,
    FloatLabelComponent,
    SidebarComponent,
    DropdownComponent,

  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    SidebarModule,
    PanelMenuModule,
    DropdownModule,
    HttpClientModule
  ],
  exports: [CardComponent,FloatLabelComponent,SidebarComponent,HeaderComponent, DropdownComponent]
})
export class SharedModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveMaintenanceDetailsComponent } from './preventive-maintenance-details.component';

describe('PreventiveMaintenanceDetailsComponent', () => {
  let component: PreventiveMaintenanceDetailsComponent;
  let fixture: ComponentFixture<PreventiveMaintenanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreventiveMaintenanceDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreventiveMaintenanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

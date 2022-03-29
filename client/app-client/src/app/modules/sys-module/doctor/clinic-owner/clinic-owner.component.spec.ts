import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicOwnerComponent } from './clinic-owner.component';

describe('ClinicOwnerComponent', () => {
  let component: ClinicOwnerComponent;
  let fixture: ComponentFixture<ClinicOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClinicOwnerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

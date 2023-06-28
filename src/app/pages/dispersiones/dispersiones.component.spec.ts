import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispersionesComponent } from './dispersiones.component';

describe('DispersionesComponent', () => {
  let component: DispersionesComponent;
  let fixture: ComponentFixture<DispersionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispersionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispersionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

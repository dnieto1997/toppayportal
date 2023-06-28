import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadomovComponent } from './estadomov.component';

describe('EstadomovComponent', () => {
  let component: EstadomovComponent;
  let fixture: ComponentFixture<EstadomovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadomovComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadomovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

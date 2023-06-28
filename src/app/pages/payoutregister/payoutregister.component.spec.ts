import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutregisterComponent } from './payoutregister.component';

describe('PayoutregisterComponent', () => {
  let component: PayoutregisterComponent;
  let fixture: ComponentFixture<PayoutregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

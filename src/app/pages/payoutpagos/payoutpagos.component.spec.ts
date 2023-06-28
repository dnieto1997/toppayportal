import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutpagosComponent } from './payoutpagos.component';

describe('PayoutpagosComponent', () => {
  let component: PayoutpagosComponent;
  let fixture: ComponentFixture<PayoutpagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutpagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

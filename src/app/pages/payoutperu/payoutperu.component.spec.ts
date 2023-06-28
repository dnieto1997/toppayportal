import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutperuComponent } from './payoutperu.component';

describe('PayoutperuComponent', () => {
  let component: PayoutperuComponent;
  let fixture: ComponentFixture<PayoutperuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutperuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutperuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

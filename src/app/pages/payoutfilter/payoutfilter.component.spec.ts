import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutfilterComponent } from './payoutfilter.component';

describe('PayoutfilterComponent', () => {
  let component: PayoutfilterComponent;
  let fixture: ComponentFixture<PayoutfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutfilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

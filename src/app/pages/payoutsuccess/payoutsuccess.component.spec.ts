import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutsuccessComponent } from './payoutsuccess.component';

describe('PayoutsuccessComponent', () => {
  let component: PayoutsuccessComponent;
  let fixture: ComponentFixture<PayoutsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutsuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

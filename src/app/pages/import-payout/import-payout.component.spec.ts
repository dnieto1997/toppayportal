import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPayoutComponent } from './import-payout.component';

describe('ImportPayoutComponent', () => {
  let component: ImportPayoutComponent;
  let fixture: ComponentFixture<ImportPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

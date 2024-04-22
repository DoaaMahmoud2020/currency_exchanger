import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyChartsComponent } from './currency-charts.component';

describe('CurrencyChartsComponent', () => {
  let component: CurrencyChartsComponent;
  let fixture: ComponentFixture<CurrencyChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyChartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

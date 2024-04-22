import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyFormComponent } from 'src/app/shared/components/currency-form/currency-form.component';
import { ICurrencyConfig } from 'src/app/shared/models/currency-config.model';
import { CurrencyChartsComponent } from '../currency-charts/currency-charts.component';

@Component({
  selector: 'app-currency-details',
  standalone: true,
  imports: [CurrencyFormComponent,RouterModule,CurrencyChartsComponent],
  templateUrl: './currency-details.component.html',
  styleUrl: './currency-details.component.scss',
})
export class CurrencyDetailsComponent {
  @Input() amount!: number;
  @Input() from!: string;
  @Input() to!: string;
  currencyData!: ICurrencyConfig;
  ngOnInit() {
    this.currencyData = {
      amount: this.amount,
      from: this.from,
      to: this.to,
      isShowButton: false,
    };
  }
}

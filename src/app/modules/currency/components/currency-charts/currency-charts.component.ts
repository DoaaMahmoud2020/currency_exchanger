import { HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { finalize } from 'rxjs/internal/operators/finalize';
import { ITimeSeries } from 'src/app/core/models/time-series.model';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-currency-charts',
  standalone: true,
  imports: [BaseChartDirective, HttpClientModule],
  templateUrl: './currency-charts.component.html',
  styleUrl: './currency-charts.component.scss',
  providers: [HttpService],
})
export class CurrencyChartsComponent {
  private _http: HttpService = inject(HttpService);
  private _destroyRef: DestroyRef = inject(DestroyRef);
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'> = { responsive: false };
  isLineChartLegend = true;
  isLoading!: boolean;
  dataChart!: any;
  ngOnInit() {
    // this.getAllChartData();
    this.initializeLineChartData();
  }

  formattedDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  initializeLineChartData(): void {
    this.lineChartData = {
      labels: this.months,
      datasets: [
        {
          data:[65, 59, 80, 81, 56, 55, 40], //this.dataChart,
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: '#eb4d4b',
        },
      ],
    };
  }
  getAllChartData() {
    this.isLoading = true;
    const dateInput = new Date();
    const year = dateInput.getFullYear();
    const month = dateInput.getMonth() + 1;
    const day = dateInput.getDate();
    const lastDayOfMonth = new Date(year, month, 0);

    this._http
      .getTimeseries(
        {
          start_date: this.formattedDate(dateInput),
          end_date: this.formattedDate(lastDayOfMonth),
        },
        'timeseries'
      )
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response: ITimeSeries) => {
          this.onSuccess(response);
        },
        error: (error: Error) => {},
      });
  }
  onSuccess(response: ITimeSeries) {
    this.dataChart = response.rates!.map((item: any) => {
      return item.value;
    });
    this.initializeLineChartData();
  }
}

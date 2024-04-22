import { Component, DestroyRef, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';
import { HttpService } from 'src/app/core/services/http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { RouterModule } from '@angular/router';
import { ICurrencyConfig } from '../../models/currency-config.model';
import { NotFoundDataComponent } from '../not-found-data/not-found-data.component';
import { IConvert } from 'src/app/core/models/convert.model';
import { ILatest } from 'src/app/core/models/latest.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-currency-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgxLoadingModule,
    RouterModule,
    NotFoundDataComponent,
    NgOptimizedImage,
  ],
  templateUrl: './currency-form.component.html',
  styleUrl: './currency-form.component.scss',
  providers: [HttpService],
})
export class CurrencyFormComponent {
  private _http: HttpService = inject(HttpService);
  private _destroyRef: DestroyRef = inject(DestroyRef);
  private _fb: FormBuilder = inject(FormBuilder);
  myForm!: FormGroup;
  isLoading!: boolean;
  fullNameFrom!: string;
  resultText: string = 'Result appears here';
  resultTo: string = 'Result from appears here';
  currenciesCodes!: any;
  @Input() data!: ICurrencyConfig;

  ngOnInit() {
    this.initialForm();
    // this.getLatest();
    if (this.data.from != null && this.data.from != undefined) {
      // this.getAllSymbols();
    }
  }
  initialForm() {
    this.myForm = this._fb.group({
      amount: [this.data?.amount, Validators.required],
      from: [
        {
          value: this.data?.from,
          disabled: this.data?.from === (null || undefined) ? false : true,
        },
        Validators.required,
      ],
      to: [this.data?.to, Validators.required],
    });
  }
  getFormControlName(Controller: string) {
    return this.myForm.get(Controller);
  }

  getLatest() {
    this.isLoading = true;
    this._http
      .getAll('latest')
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response: ILatest) => {
          this.onSuccess(response);
        },
        error: (error: Error) => {},
      });
  }
  getAllSymbols() {
    this.isLoading = true;
    this._http
      .getAll('symbols')
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response: any) => {
          this.onHandleSuccess(response);
        },
        error: (error: Error) => {},
      });
  }
  onSuccess(response: any) {
    this.currenciesCodes = Object.keys(response.rates!);
  }
  onHandleSuccess(response: any) {
    this.fullNameFrom = `${this.data.from!}-${
      response.symbols[this.data.from!]
    }`;
  }

  onSubmit() {
    this.isLoading = true;
    if (this.myForm.valid) {
      let amount: number = parseFloat(this.getFormControlName('amount')!.value);
      let convertFrom: string = this.getFormControlName('from')!.value;
      let convertTo: string = this.getFormControlName('to')!.value;
      this._http
        .getConvert(
          { to: convertTo, from: convertFrom, amount: amount },
          'convert'
        )
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => (this.isLoading = false))
        )
        .subscribe({
          next: (response: IConvert) => {
            this.onFormSuccess(response);
          },
          error: (error: Error) => {
            this.isLoading = false;
          },
        });
    }
  }
  onFormSuccess(response: IConvert) {
    this.isLoading = false;
    const result = parseFloat(response.result!.toFixed(3)); // result to 2 decimal places
    this.resultText = `${response.query!.amount} ${
      response.query!.from
    } = ${result} ${response.query!.to}`;
    this.resultTo = `${result} ${response.query!.to}`;
  }
  onSwapCurrency() {
    const { from, to } = {
      from: this.getFormControlName('from'),
      to: this.getFormControlName('to'),
    };

    if (from && to) {
      const fromValue = from.value;
      this.getFormControlName('from')!.setValue(to.value);
      this.getFormControlName('to')!.setValue(fromValue);
    }
  }
}

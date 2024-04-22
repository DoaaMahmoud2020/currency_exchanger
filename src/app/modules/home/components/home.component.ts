import { Component} from '@angular/core';
import { CurrencyFormComponent } from 'src/app/shared/components/currency-form/currency-form.component';
import { ICurrencyConfig } from 'src/app/shared/models/currency-config.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  currencyData: ICurrencyConfig = {
    isShowButton:true,
    textHeader:"Currency Exchanger"
  };
}

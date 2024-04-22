import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found-data.component.html',
  styleUrls: ['./not-found-data.component.scss'],
})
export class NotFoundDataComponent {
  @Input() message: string | undefined = 'No Data Found!';
}

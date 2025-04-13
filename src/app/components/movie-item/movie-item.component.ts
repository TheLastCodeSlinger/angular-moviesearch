import { Component, Input } from '@angular/core';
import { MovieBase } from '@/types/api-types';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-item',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './movie-item.component.html',
  standalone: true,
})
export class MovieItemComponent {
  @Input() movieItem: MovieBase | undefined;
}

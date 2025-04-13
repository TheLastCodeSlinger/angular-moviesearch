import { Component, Input } from '@angular/core';
import { MovieBase } from '@/types/api-types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  imports: [RouterLink],
  templateUrl: './movie-item.component.html',
  standalone: true,
})
export class MovieItemComponent {
  @Input() movieItem: MovieBase | undefined;
}

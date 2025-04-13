import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { MovieBase } from '@/types/api-types';

@Component({
  selector: 'app-movie-list',
  imports: [MovieItemComponent],
  templateUrl: './movie-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  @Input() movieList: MovieBase[] = [];
}

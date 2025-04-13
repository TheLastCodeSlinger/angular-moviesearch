import { Component, effect, inject } from '@angular/core';
import { GenreListService } from '@/services/genreList.service';
import { MovieListService } from '@/services/movieList.service';
import { MovieListComponent } from '@/components/movie-list/movie-list.component';

@Component({
  selector: 'app-movies',
  imports: [MovieListComponent],
  templateUrl: './movies-container.component.html',
  standalone: true,
})
export class MoviesContainerComponent {
  movieService = inject(MovieListService);
  genreService = inject(GenreListService);

  constructor() {
    effect(() => {
      const categoryItem = this.genreService.activeCategory$();
      // Prevent rerender if item didn't change
      if (categoryItem) {
        this.movieService.fetchMovies(categoryItem);
      }
    });
  }
}

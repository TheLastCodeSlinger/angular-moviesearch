import { Component, effect, inject } from '@angular/core';
import { GenreListService } from '../../services/genreList.service';
import { MovieListService } from '../../services/movieList.service';
import { MovieListComponent } from '../../components/movieList/movie-list.component';

@Component({
  selector: 'app-genre',
  imports: [MovieListComponent],
  templateUrl: './genre.component.html',
})
export class GenreComponent {
  movieService = inject(MovieListService);
  genreService = inject(GenreListService);

  constructor() {
    effect(() => {
      const discoveryItem = this.genreService.activeGenre$();
      // Prevent rerender if item didn't change
      if (discoveryItem) {
        this.movieService.fetchGenre(discoveryItem);
      }
    });
  }
}

import { Component, effect, inject } from '@angular/core';
import { MovieListService } from '../../services/movieList.service';
import { GenreListService } from '../../services/genreList.service';
import { MovieListComponent } from '../../components/movieList/movie-list.component';

@Component({
  selector: 'app-discovery',
  imports: [MovieListComponent],
  templateUrl: './discovery.component.html',
  standalone: true,
})
export class DiscoveryComponent {
  movieService = inject(MovieListService);
  genreService = inject(GenreListService);

  constructor() {
    effect(() => {
      const discoveryItem = this.genreService.activeDiscovery$();
      // Prevent rerender if item didn't change
      if (discoveryItem) {
        this.movieService.fetchDiscovery(discoveryItem);
      }
    });
  }
}

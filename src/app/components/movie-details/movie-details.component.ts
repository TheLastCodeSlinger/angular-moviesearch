import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsService } from '../../services/movieDetails.service';
import { MovieListComponent } from '../movieList/movie-list.component';

@Component({
  selector: 'app-movie-details',
  imports: [MovieListComponent],
  templateUrl: './movie-details.component.html',
  standalone: true,
})
export class MovieDetailsComponent {
  route = inject(ActivatedRoute);
  detailsService = inject(MovieDetailsService);

  constructor() {
    effect(() => {
      this.route.paramMap.subscribe((params) => {
        {
          const id = parseFloat(params.get('id') ?? '');
          if (id) {
            this.detailsService.fetchMovieDetails(id);
            this.detailsService.fetchRecommendedMovies(id);
          }
          console.log(id, this.detailsService.movieDetails$());
        }
      });
    });
  }

  getImageUrls(path: string | null | undefined) {
    // TODO: placeholder
    return path
      ? `url(https://image.tmdb.org/t/p/original/${path})`
      : 'placeholder.jpg';
  }
}

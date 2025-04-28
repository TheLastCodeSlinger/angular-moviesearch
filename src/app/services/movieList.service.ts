import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import {
  ApiParams,
  CategoryEnum,
  CategoryType,
  Genre,
  NowPlayingUpcomingApiResponse,
  PopularTopRatedApiResponse,
} from '@/types/api-types';
import { DiscoverGenre } from '@/types/app-types';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private currentMovieList = signal<PopularTopRatedApiResponse | NowPlayingUpcomingApiResponse>({
    page: 1,
    total_pages: 0,
    total_results: 0,
    results: [],
  });
  public currentMovieList$ = this.currentMovieList.asReadonly();
  fetchDiscoveryMovies(categoryItem: (Genre | CategoryType) & { type: DiscoverGenre }, page: number, reset?: boolean) {
    return this.api.getDiscoverByCategory(page, categoryItem.id as CategoryEnum).subscribe({
      next: (res) => {
        if (reset) {
          this.currentMovieList.set(res);
        } else {
          this.currentMovieList.update((movieData) => {
            movieData.results = [...this.currentMovieList$().results, ...res.results];
            return movieData;
          });
        }
        this.router.navigate([], { relativeTo: this.route, queryParams: { page: page } });
      },
    });
  }

  fetchGenreMovies(
    categoryItem: (Genre | CategoryType) & { type: DiscoverGenre },
    page: number,
    sortBy: ApiParams['sortBy'],
    reset?: boolean,
  ) {
    return this.api.getGenreById(page, categoryItem.id as number, sortBy).subscribe({
      next: (res) => {
        if (reset) {
          this.currentMovieList.set(res);
        } else {
          this.currentMovieList.update((movieData) => {
            movieData.results = [...this.currentMovieList$().results, ...res.results];
            return movieData;
          });
        }
        this.router.navigate([], { relativeTo: this.route, queryParams: { page: page } });
      },
    });
  }
}

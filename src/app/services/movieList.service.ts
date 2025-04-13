import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import {
  CategoryEnum,
  CategoryType,
  Genre,
  MovieBase,
} from '@/types/api-types';
import { DiscoverGenre } from '@/types/app-types';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private api = inject(ApiService);

  // TODO: check ob 2 listen für genre/discovery oder doch nur 1
  private currentMovieList = signal<MovieBase[]>([]);
  public currentMovieList$ = this.currentMovieList.asReadonly();

  fetchMovies(categoryItem: (Genre | CategoryType) & { type: DiscoverGenre }) {
    if (categoryItem.type === 'discover') {
      return this.api
        .getDiscoverByCategory(1, categoryItem.id as CategoryEnum)
        .subscribe({
          next: (res) => {
            // TODO: hier sollte das gesamte objekt für pagination benutzt werden
            this.currentMovieList.set(res.results);
          },
        });
    }
    // TODO: page dynamisch + sorting zum enum machen
    return this.api
      .getGenreById(1, categoryItem.id as number, 'popularity_desc')
      .subscribe({
        next: (res) => {
          this.currentMovieList.set(res.results);
        },
      });
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { CategoryType, Genre, MovieBase } from '../types/api-types';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private api = inject(ApiService);

  // TODO: check ob 2 listen für genre/discovery oder doch nur 1
  private currentMovieList = signal<MovieBase[]>([]);
  public currentMovieList$ = this.currentMovieList.asReadonly();

  fetchDiscovery(discoveryItem: CategoryType) {
    this.api.getDiscoverByCategory(1, discoveryItem.appKey).subscribe({
      next: (res) => {
        // TODO: hier sollte das gesamte objekt für pagination benutzt werden
        this.currentMovieList.set(res.results);
      },
    });
  }

  fetchGenre(genreItem: Genre) {
    // TODO: page dynamisch + sorting zum enum machen
    this.api.getGenreById(1, genreItem.id, 'popularity_desc').subscribe({
      next: (res) => {
        this.currentMovieList.set(res.results);
      },
    });
  }
}

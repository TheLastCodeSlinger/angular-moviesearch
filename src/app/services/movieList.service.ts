import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { CategoryEnum, CategoryType, Genre, MovieBase } from '@/types/api-types';
import { DiscoverGenre } from '@/types/app-types';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // TODO: check ob 2 listen für genre/discovery oder doch nur 1
  private currentMovieList = signal<MovieBase[]>([]);
  public currentMovieList$ = this.currentMovieList.asReadonly();

  fetchMovies(categoryItem: (Genre | CategoryType) & { type: DiscoverGenre }, page: number) {
    if (categoryItem.type === 'discover') {
      this.router.navigate([], { relativeTo: this.route, queryParams: { page: page } });
      return this.api.getDiscoverByCategory(page, categoryItem.id as CategoryEnum).subscribe({
        next: (res) => {
          // TODO: hier sollte das gesamte objekt für pagination benutzt werden
          this.currentMovieList.set(res.results);
        },
      });
    }
    // TODO: page dynamisch + sorting zum enum machen
    return this.api.getGenreById(page, categoryItem.id as number, 'popularity_desc').subscribe({
      next: (res) => {
        this.currentMovieList.set(res.results);
      },
    });
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { CategoryEnum, CategoryType, Genre } from '../types/api-types';
import { DiscoverGenre } from '../types/app-types';

@Injectable({
  providedIn: 'root',
})
export class GenreListService {
  private api = inject(ApiService);

  private genreList = signal<Genre[]>([]);
  public genreList$ = this.genreList.asReadonly();

  private activeCategory = signal<
    (CategoryType | Genre) & { type: DiscoverGenre }
  >({
    id: CategoryEnum.POPULAR,
    name: 'Popular',
    type: 'discover',
  });
  public activeCategory$ = this.activeCategory.asReadonly();

  fetchGenreList() {
    this.api.getGenreList().subscribe({
      next: (res) => {
        this.genreList.set(res.genres);
      },
      error: (err) => {
        console.error('Fetching genrelist failed', err);
      },
    });
  }
  setActiveCategory(categoryItem: Genre | CategoryType, type: DiscoverGenre) {
    this.activeCategory.set({
      id: categoryItem.id,
      name: categoryItem.name,
      type,
    });
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { CategoryEnum, CategoryType, Genre } from '../types/api-types';

@Injectable({
  providedIn: 'root',
})
export class GenreListService {
  private api = inject(ApiService);

  private genreList = signal<Genre[]>([]);
  public genreList$ = this.genreList.asReadonly();
  private activeGenre = signal<Genre>({ id: 999999, name: '' });
  public activeGenre$ = this.activeGenre.asReadonly();
  private activeDiscovery = signal<CategoryType>({
    appKey: CategoryEnum.POPULAR,
    displayName: 'Popular',
  });
  public activeDiscovery$ = this.activeDiscovery.asReadonly();

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

  setActiveGenre(genreItem: Genre) {
    console.log(genreItem);

    this.activeGenre.set(genreItem);
    this.activeDiscovery.set({ appKey: CategoryEnum.NONE, displayName: '' });
  }

  setActiveDiscovery(discoveryItem: CategoryType) {
    console.log(discoveryItem);

    this.activeDiscovery.set(discoveryItem);
    this.activeGenre.set({ id: 999999, name: '' });
  }
}

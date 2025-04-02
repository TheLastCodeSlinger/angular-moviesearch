import { inject, Injectable, signal } from '@angular/core';
import { MovieBase, MovieDetailsResponse } from '../types/api-types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  api = inject(ApiService);
  private movieDetails = signal<MovieDetailsResponse | undefined>(undefined);
  public movieDetails$ = this.movieDetails.asReadonly();
  private recommendedMovieList = signal<MovieBase[]>([]);
  public recommendedMovieList$ = this.recommendedMovieList.asReadonly();

  fetchMovieDetails(id: number) {
    this.api.getAllMovieDetailsByMovieId(id).subscribe({
      next: (res) => {
        this.movieDetails.set(res);
      },
      error: (err) => {
        console.error('fetching movie details went wrong', err);
      },
    });
  }

  fetchRecommendedMovies(id: number) {
    this.api.getRecommendedMoviesByMovieId(id).subscribe({
      next: (res) => {
        this.recommendedMovieList.set(res.results);
      },
      error: (err) => {
        console.warn('Fetching recommended failed', err);
      },
    });
  }
}

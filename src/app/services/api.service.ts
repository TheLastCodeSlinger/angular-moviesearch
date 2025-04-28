import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '~/environments/environment';
import {
  ApiParams,
  CategoryEnum,
  GenreResponse,
  MovieCreditsResponse,
  MovieDetailsResponse,
  NowPlayingUpcomingApiResponse,
  PersonCreditsResponse,
  PersonDetailsResponse,
  PopularTopRatedApiResponse,
  VideoResponse,
} from '../types/api-types';

const path = environment.baseUrl;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  private isLoading = signal(false);
  public isLoading$ = this.isLoading.asReadonly();

  // This is a generic wrapper for API calls that auto manages loading state
  private manageLoading<T>(observable: Observable<T>): Observable<T> {
    this.startCall();
    return observable.pipe(
      tap({
        next: () => this.endCall(),
        error: () => this.endCall(), // handle error and stop loading
      }),
    );
  }
  startCall() {
    this.isLoading.set(true);
  }

  endCall() {
    this.isLoading.set(false);
  }

  getGenreById(page = 1, genreId: number, sortOption: ApiParams['sortBy']): Observable<PopularTopRatedApiResponse> {
    // if (page === 2) {
    //   return of(actionPage2);
    // }
    // return of(actionPage1);
    // TODO: mockdaten ausstellen oder durch env steuern
    return this.manageLoading(
      this.http.get<PopularTopRatedApiResponse>(path + '/discover/movie', {
        params: {
          language: 'en-us',
          page,
          api_key: apiKey,
          with_genres: genreId,
          sort_by: sortOption,
        },
      }),
    );
  }
  getDiscoverByCategory(
    page = 1,
    category: CategoryEnum,
  ): Observable<PopularTopRatedApiResponse | NowPlayingUpcomingApiResponse> {
    // return of(topRatedMockData);
    // TODO: mockdaten ausstellen oder durch env steuern
    return this.manageLoading(
      this.http.get<PopularTopRatedApiResponse | NowPlayingUpcomingApiResponse>(path + '/movie/' + category, {
        params: {
          language: 'en-us',
          page,
          api_key: apiKey,
        },
      }),
    );
  }

  getSearchResultByInput(page: number, input: string): Observable<PopularTopRatedApiResponse> {
    // return of(searchHarryMockData);
    // TODO: mockdaten ausstellen oder durch env steuern
    return this.http.get<PopularTopRatedApiResponse>(path + '/search/movie', {
      params: {
        language: 'en-us',
        page,
        api_key: apiKey,
        query: input,
      },
    });
  }

  getPersonDetailsByPersonId(personId: number): Observable<PersonDetailsResponse> {
    // return of(danielRadcliffe);
    return this.http.get<PersonDetailsResponse>(path + '/person/' + personId, {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }

  getMovieCreditsByPersonId(personId: number): Observable<PersonCreditsResponse> {
    // return of(personalCredits);
    return this.http.get<PersonCreditsResponse>(path + '/person/' + personId + '/movie_credits', {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }

  getGenreList(): Observable<GenreResponse> {
    // return of(genreList);
    return this.http.get<GenreResponse>(path + '/genre/movie/list', {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }

  getAllMovieDetailsByMovieId(movieId: number): Observable<MovieDetailsResponse> {
    // return of(generalData);
    return this.http.get<MovieDetailsResponse>(path + '/movie/' + movieId, {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }

  getCastMembersByMovieId(movieId: number): Observable<MovieCreditsResponse> {
    // return of(movieCredits);
    return this.http.get<MovieCreditsResponse>(path + '/movie/' + movieId + '/credits', {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }

  getRecommendedMoviesByMovieId(movieId: number): Observable<PopularTopRatedApiResponse> {
    // return of(recommendations);
    return this.http.get<PopularTopRatedApiResponse>(path + '/movie/' + movieId + '/recommendations', {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }

  getTrailerDetailsByMovieId(movieId: number): Observable<VideoResponse> {
    // return of(movieTrailer);
    return this.http.get<VideoResponse>(path + '/movie/' + movieId + '/videos', {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }
}

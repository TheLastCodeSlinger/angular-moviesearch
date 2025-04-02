import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { TC_NO_LOADER } from '../interceptors/loading.interceptor';
import popularMockData from '../mockData/popular.json';
import topRatedMockData from '../mockData/top_rated.json';
import searchHarryMockData from '../mockData/searchHarry.json';
import danielRadcliffe from '../mockData/personDetail/Danie_Jacob_Radcliffe.json';
import personalCredits from '../mockData/personDetail/MovieCredits.json';
import genreList from '../mockData/genreList.json';
import actionPage1 from '../mockData/actionGenre/action_page1.json';
import actionPage2 from '../mockData/actionGenre/action_page2.json';
import movieCredits from '../mockData/movieDetail/movieCredits.json';
import movieTrailer from '../mockData/movieDetail/videos.json';
import recommendations from '../mockData/movieDetail/recommendations.json';
import generalData from '../mockData/movieDetail/allDetails.json';
import {
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
  /**
   * the value of this subject/observable pair represents the amount of currently running http-requests
   * when the value is 0 no spinner is shown
   * this is to prevent flickering and other weird behaviours with concurrent requests
   * do not replace with signals, signals do not work asynchronously
   */
  private isLoading: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isLoading$ = this.isLoading.asObservable();

  private makeOptions(noSpinner: boolean) {
    const options: Record<string, unknown> = {};
    if (noSpinner) {
      options['context'] = new HttpContext().set(TC_NO_LOADER, true);
    }
    return options;
  }

  // getAnswers(noSpinner = false) {
  //   const options = this.makeOptions(noSpinner);
  //   return this.http.get<{
  //     responses: Answer[];
  //   }>(path + '/answers', options);
  // }

  startCall() {
    // increment value for every request that starts
    this.isLoading.next(this.isLoading.value + 1);
  }

  endCall() {
    // decrease value for every request that ends or errors or cancels
    this.isLoading.next(this.isLoading.value - 1);
  }

  getPopular(): Observable<PopularTopRatedApiResponse> {
    return of(popularMockData);
    // TODO: mockdaten ausstellen oder durch env steuern
    return this.http.get<PopularTopRatedApiResponse>(path + '/movie/popular', {
      params: {
        language: 'en-us',
        page: 1,
        api_key: apiKey,
      },
    });
  }
  getGenreById(
    page: number,
    genreId: number,
    sortOption: string,
  ): Observable<PopularTopRatedApiResponse> {
    if (page === 2) {
      return of(actionPage2);
    }
    return of(actionPage1);
    // TODO: mockdaten ausstellen oder durch env steuern
    return this.http.get<PopularTopRatedApiResponse>(path + '/discover/movie', {
      params: {
        language: 'en-us',
        page,
        api_key: apiKey,
        with_genres: genreId,
        sort_by: sortOption,
      },
    });
  }
  getDiscoverByCategory(
    page: number,
    category: CategoryEnum,
  ): Observable<PopularTopRatedApiResponse | NowPlayingUpcomingApiResponse> {
    return of(topRatedMockData);
    // TODO: mockdaten ausstellen oder durch env steuern
    return this.http.get<
      PopularTopRatedApiResponse | NowPlayingUpcomingApiResponse
    >(path + '/movie/' + category, {
      params: {
        language: 'en-us',
        page,
        api_key: apiKey,
      },
    });
  }

  getSearchResultByInput(
    page: number,
    input: string,
  ): Observable<PopularTopRatedApiResponse> {
    return of(searchHarryMockData);
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

  getPersonDetailsByPersonId(
    personId: number,
  ): Observable<PersonDetailsResponse> {
    return of(danielRadcliffe);
    return this.http.get<PersonDetailsResponse>(path + '/person/' + personId, {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }

  getMovieCreditsByPersonId(
    personId: number,
  ): Observable<PersonCreditsResponse> {
    return of(personalCredits);
    return this.http.get<PersonCreditsResponse>(
      path + '/person/' + personId + '/movie_credits',
      {
        params: {
          language: 'en-us',
          api_key: apiKey,
        },
      },
    );
  }

  getGenreList(): Observable<GenreResponse> {
    return of(genreList);
    return this.http.get<GenreResponse>(path + '/genre/movie/list', {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }

  getAllMovieDetailsByMovieId(
    movieId: number,
  ): Observable<MovieDetailsResponse> {
    return of(generalData);
    return this.http.get<MovieDetailsResponse>(path + '/movie/' + movieId, {
      params: {
        language: 'en-us',
        api_key: apiKey,
      },
    });
  }

  getCastMembersByMovieId(movieId: number): Observable<MovieCreditsResponse> {
    return of(movieCredits);
    return this.http.get<MovieCreditsResponse>(
      path + '/movie/' + movieId + '/credits',
      {
        params: {
          language: 'en-us',
          api_key: apiKey,
        },
      },
    );
  }

  getRecommendedMoviesByMovieId(
    movieId: number,
  ): Observable<PopularTopRatedApiResponse> {
    return of(recommendations);
    return this.http.get<PopularTopRatedApiResponse>(
      path + '/movie/' + movieId + '/recommendations',
      {
        params: {
          language: 'en-us',
          api_key: apiKey,
        },
      },
    );
  }

  getTrailerDetailsByMovieId(movieId: number): Observable<VideoResponse> {
    return of(movieTrailer);
    return this.http.get<VideoResponse>(
      path + '/movie/' + movieId + '/videos',
      {
        params: {
          language: 'en-us',
          api_key: apiKey,
        },
      },
    );
  }
}

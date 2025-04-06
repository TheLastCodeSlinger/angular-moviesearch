export enum CategoryEnum {
  TOP_RATED = 'top_rated',
  POPULAR = 'popular',
  UPCOMING = 'upcoming',
  NOW_PLAYING = 'now_playing',
  NONE = '',
}

export interface CategoryType {
  name: string;
  id: CategoryEnum;
}

export const categories = [
  {
    name: 'Top Rated',
    id: CategoryEnum.TOP_RATED,
  },
  {
    name: 'Popular',
    id: CategoryEnum.POPULAR,
  },
  {
    name: 'Upcoming',
    id: CategoryEnum.UPCOMING,
  },
  {
    name: 'Now Playing',
    id: CategoryEnum.NOW_PLAYING,
  },
];

export interface NowPlayingUpcomingApiResponse {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number; // Defaults to 0
  results: MovieBase[];
  total_pages: number; // Defaults to 0
  total_results: number; // Defaults to 0
}

export interface PopularTopRatedApiResponse {
  page: number; // Defaults to 0
  results: MovieBase[];
  total_pages: number; // Defaults to 0
  total_results: number; // Defaults to 0
}

export interface MovieBase {
  adult: boolean; // Defaults to true
  backdrop_path: string | null;
  genre_ids: number[];
  id: number; // Defaults to 0
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number; // Defaults to 0
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean; // Defaults to true
  vote_average: number; // Defaults to 0
  vote_count: number; // Defaults to 0
}

export interface MovieCreditsResponse {
  id: number; // Defaults to 0
  cast: MovieCastMember[];
  crew: MovieCrewMember[];
}

export interface MovieCastMember {
  adult: boolean; // Defaults to true
  gender: number; // Defaults to 0
  id: number; // Defaults to 0
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number; // Defaults to 0
  profile_path: string | null;
  cast_id: number; // Defaults to 0
  character: string;
  credit_id: string;
  order: number; // Defaults to 0
}

export interface MovieCrewMember {
  adult: boolean; // Defaults to true
  gender: number; // Defaults to 0
  id: number; // Defaults to 0
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number; // Defaults to 0
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface PersonCreditsResponse {
  id: number; // Defaults to 0
  cast: PersonCastMember[];
  crew: PersonCrewMember[];
}

export interface PersonCastMember extends MovieBase {
  character: string;
  credit_id: string;
  order: number; // Defaults to 0
}

export interface PersonCrewMember extends MovieBase {
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieDetailsResponse {
  adult: boolean; // Defaults to true
  backdrop_path: string;
  belongs_to_collection: MovieCollection | null;
  budget: number; // Defaults to 0
  genres: Genre[];
  homepage: string;
  id: number; // Defaults to 0
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number; // Defaults to 0
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number; // Defaults to 0
  runtime: number; // Defaults to 0
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean; // Defaults to true
  vote_average: number; // Defaults to 0
  vote_count: number; // Defaults to 0
}

export interface MovieCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface Genre {
  id: number; // Defaults to 0
  name: string;
}

export interface ProductionCompany {
  id: number; // Defaults to 0
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface PersonDetailsResponse {
  adult: boolean; // Defaults to true
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number; // Defaults to 0
  homepage: string | null;
  id: number; // Defaults to 0
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number; // Defaults to 0
  profile_path: string;
}

export interface VideoResponse {
  id: number; // Defaults to 0
  results: Video[];
}

export interface Video {
  iso_639_1: string; // Language code
  iso_3166_1: string; // Country code
  name: string; // Name of the video
  key: string; // The key to access the video on the platform (e.g., YouTube key)
  site: string; // The site where the video is hosted (e.g., 'YouTube')
  size: number; // The size of the video (likely resolution)
  type: string; // The type of video (e.g., 'Trailer', 'Clip')
  official: boolean; // Whether the video is official
  published_at: string; // Date the video was published
  id: string; // The unique identifier for the video
}

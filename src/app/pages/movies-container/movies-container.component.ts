import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { GenreListService } from '@/services/genreList.service';
import { MovieListService } from '@/services/movieList.service';
import { MovieListComponent } from '@/components/movie-list/movie-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiParams } from '~/app/types/api-types';
import { ApiService } from '~/app/services/api.service';

@Component({
  selector: 'app-movies',
  imports: [MovieListComponent, FormsModule],
  templateUrl: './movies-container.component.html',
  standalone: true,
})
export class MoviesContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('infiniteScrollTarget') scrollTarget!: ElementRef;
  private observer!: IntersectionObserver;

  movieService = inject(MovieListService);
  genreService = inject(GenreListService);
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  page = 0;

  // TODO: Vielleicht auslagern in eigene comp, wenn es noch woanders benutzt wird
  public sortOptions: { value: ApiParams['sortBy']; label: string }[] = [
    { value: 'popularity.desc', label: 'Popularity (Desc)' },
    { value: 'popularity.asc', label: 'Popularity (Asc)' },
    { value: 'title.desc', label: 'Title (Desc)' },
    { value: 'title.asc', label: 'Title (Asc)' },
    { value: 'vote_average.desc', label: 'Votes Average (Desc)' },
    { value: 'vote_average.asc', label: 'Votes Average (Asc)' },
    { value: 'release_date.desc', label: 'Release Date' },
    { value: 'revenue.desc', label: 'Revenue (Desc)' },
    { value: 'revenue.asc', label: 'Revenue (Asc)' },
    { value: 'primary_release_date.desc', label: 'Primary Release Date (Desc)' },
    { value: 'primary_release_date.asc', label: 'Primary Release Date (Asc)' },
    { value: 'vote_count.desc', label: 'Vote Count (Desc)' },
    { value: 'vote_count.asc', label: 'Vote Count (Asc)' },
  ];
  selectedOption = this.sortOptions[0];

  constructor() {
    effect(() => {
      // If category changed, navigate back to page 1
      // effect runs before afterViewInit so check for 0 page for sideeffects like double fetch
      const categoryItem = this.genreService.activeCategory$();
      if (categoryItem.id || this.page !== 0) {
        if (categoryItem.type === 'discover') {
          this.movieService.fetchDiscoveryMovies(categoryItem, 1, true);
        } else {
          this.movieService.fetchGenreMovies(categoryItem, 1, this.selectedOption.value as ApiParams['sortBy'], true);
        }
        this.page = 1;
      }
    });
  }

  ngAfterViewInit(): void {
    // Observer is bound to html-element => afterViewInit guarantees it is there
    this.observer = new IntersectionObserver(([entry]) => {
      // Wait until effect has finished loading so the endless scroll loading isn't called instantly
      // TODO: vllt andere lösung z.B. initiale höhe besser setzen oder auf scroll-event listen?
      if (entry.isIntersecting && !this.apiService.isLoading$()) {
        const activeCategory = this.genreService.activeCategory$();
        this.page++;

        if (activeCategory.type === 'discover') {
          this.movieService.fetchDiscoveryMovies(activeCategory, this.page);
        } else {
          this.movieService.fetchGenreMovies(
            activeCategory,
            this.page,
            this.selectedOption.value as ApiParams['sortBy'],
          );
        }
      }
    });
    this.observer.observe(this.scrollTarget.nativeElement);
  }

  fetchSortedMovies(sortBy: ApiParams['sortBy']) {
    this.movieService.fetchGenreMovies(this.genreService.activeCategory$(), 1, sortBy, true);
    this.page = 1;
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}

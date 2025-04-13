import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { GenreListService } from '@/services/genreList.service';
import { MovieListService } from '@/services/movieList.service';
import { MovieListComponent } from '@/components/movie-list/movie-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [MovieListComponent],
  templateUrl: './movies-container.component.html',
  standalone: true,
})
export class MoviesContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('infiniteScrollTarget') scrollTarget!: ElementRef;
  private observer!: IntersectionObserver;

  movieService = inject(MovieListService);
  genreService = inject(GenreListService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  page = 0;

  ngAfterViewInit(): void {
    // Observer is bound to html-element => afterViewInit guarantees it is there
    this.observer = new IntersectionObserver(([entry]) => {
      // TODO: build in loading + other condiditons
      if (entry.isIntersecting) {
        this.page++;
        this.movieService.fetchMovies(this.genreService.activeCategory$(), this.page);
      }
    });
    this.observer.observe(this.scrollTarget.nativeElement);
  }

  constructor() {
    effect(() => {
      // If category changed, navigate back to page 1
      const categoryItem = this.genreService.activeCategory$();
      if (categoryItem) {
        this.movieService.fetchMovies(categoryItem, 1);
        this.page = 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}

import { Component } from '@angular/core';
import { MovieDetailsComponent } from '@/components/movie-details/movie-details.component';

@Component({
  selector: 'app-movie-details-container',
  imports: [MovieDetailsComponent],
  templateUrl: './movie-details-container.component.html',
})
export class MovieDetailsContainerComponent {}

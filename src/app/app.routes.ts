import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './pages/movies/movies.component';

export const routes: Routes = [
  {
    path: 'Discover/Now Playing',
    loadComponent: () => MoviesComponent,
  },
  {
    path: 'Discover/Upcoming',
    loadComponent: () => MoviesComponent,
  },
  {
    path: 'Discover/Popular',
    loadComponent: () => MoviesComponent,
  },
  {
    path: 'Discover/Top Rated',
    loadComponent: () => MoviesComponent,
  },
  { path: 'Genre/:name', loadComponent: () => MoviesComponent },
  { path: 'Movie/:title/:id', loadComponent: () => MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

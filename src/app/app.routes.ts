import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviedetailsComponent } from './pages/moviedetails/moviedetails.component';

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
  { path: 'Movie/:title/:id', loadComponent: () => MoviedetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

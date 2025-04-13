import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from '@/pages/movies/movies.component';
import { MovieDetailsContainerComponent } from '@/pages/movie-details-container/movie-details-container.component';

export const routes: Routes = [
  {
    path: 'Discover/:name',
    loadComponent: () => MoviesComponent,
  },
  { path: 'Genre/:name', loadComponent: () => MoviesComponent },
  {
    path: 'Movie/:title/:id',
    loadComponent: () => MovieDetailsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

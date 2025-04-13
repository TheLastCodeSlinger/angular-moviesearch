import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesContainerComponent } from '~/app/pages/movies-container/movies-container.component';
import { MovieDetailsContainerComponent } from '@/pages/movie-details-container/movie-details-container.component';

export const routes: Routes = [
  {
    path: 'Discover/:name',
    loadComponent: () => MoviesContainerComponent,
  },
  { path: 'Genre/:name', loadComponent: () => MoviesContainerComponent },
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

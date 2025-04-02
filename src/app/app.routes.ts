import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import { GenreComponent } from './pages/genre/genre.component';

export const routes: Routes = [
  {
    path: 'Discover/Now Playing',
    loadComponent: () => DiscoveryComponent,
  },
  {
    path: 'Discover/Upcoming',
    loadComponent: () => DiscoveryComponent,
  },
  {
    path: 'Discover/Popular',
    loadComponent: () => DiscoveryComponent,
  },
  {
    path: 'Discover/Top Rated',
    loadComponent: () => DiscoveryComponent,
  },
  { path: 'Genre/:name', loadComponent: () => GenreComponent },
  { path: 'Movie/:title/:id', loadComponent: () => MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
